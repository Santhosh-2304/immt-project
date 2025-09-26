import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import ToggleSwitch from '../components/ToggleSwitch';
import Sidebar from '../components/Sidebar';

export default function Lights() {
  const [user, setUser] = useState(null);
  const [homes, setHomes] = useState([]);
  const [selectedHomeId, setSelectedHomeId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [home, setHome] = useState(null);
  const [masterOn, setMasterOn] = useState(false);

//load user
  useEffect(() => {
     const u = JSON.parse(localStorage.getItem('user') || 'null');
     if (!u) {
       navigate('/login');
     } else {
       setUser(u);
     }
   }, []);

//Load homes for sidebar
   useEffect(() => {
       async function fetchHomes() {
         const res = await api.get('/homes');
         setHomes(res.data);
         if (res.data.length && !selectedHomeId) {
           setSelectedHomeId(res.data[0]._id);
         }
       }
       fetchHomes();
     }, []);
 
//Load selected home setails
  useEffect(() => {
    async function fetchHome() {
      try {
        const res = await api.get(`/homes/${id}`);
        setHome(res.data);
        setMasterOn(res.data.lights.every(l => l.on));
        localStorage.setItem('lastHomeId', id); // remember current home
      } catch (err) {
        console.error(err);
      }
    }
    fetchHome();
  }, [id]);

  async function toggleLight(lightId, value) {
    try {
      await api.patch(`/homes/${id}/lights/${lightId}`, { on: value });
      const res = await api.get(`/homes/${id}`);
      setHome(res.data);
      setMasterOn(res.data.lights.every(l => l.on));
    } catch (err) {
      console.error(err);
    }
  }

  async function setAll(value) {
    try {
      await api.put(`/homes/${id}/lights`, { setAll: true, on: value });
      const res = await api.get(`/homes/${id}`);
      setHome(res.data);
      setMasterOn(value);
    } catch (err) {
      console.error(err);
    }
  }

  if (!home) return <div className="loading">Loading...</div>;

  return (
    <div className="lights-page">
      <div className="lights-header">
        <button className="btn outline" onClick={() => navigate('/dashboard')}>Back</button>
        <h2>{home.name} — Lights</h2>
        <div style={{ marginLeft: 'auto' }}>
            <h3>Master</h3> 
        </div>
        <div>
        <ToggleSwitch checked={masterOn} onChange={v => setAll(v)} />
        </div>
      </div>
      <div className='lights-assembly'>
        <div className='side'>
            <Sidebar
                    user={user}
                    homes={homes}
                    onHomeClick={(homeId) => navigate(`/homes/${homeId}/lights`)|| setSelectedHomeId(homeId) }
                    selectedHomeId={id}
                    />
        </div>
      <div className="lights-grid">
        {home.lights.map(l => (
          <div key={l._id} className="light-row">
            <div>
              <div className="light-name">{l.name}</div>
              <div className="muted">{l.room || ''}</div>
            </div>
            <ToggleSwitch checked={l.on} onChange={v => toggleLight(l._id, v)} />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
