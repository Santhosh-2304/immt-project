import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Sidebar from '../components/Sidebar';
import LightsPieChart from "../components/LightsPieChart";


export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [homes, setHomes] = useState([]);
  const [selectedHomeId, setSelectedHomeId] = useState(null);
  const [homeDetails, setHomeDetails] = useState(null);

  // load user
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    if (!u) {
      navigate('/login');
    } else {
      setUser(u);
    }
  }, []);

  // load homes (summary)
  useEffect(() => {
    async function fetchHomes() {
      const res = await api.get('/homes');
      setHomes(res.data);
      if (res.data.length) {
        // check localStorage for last selected home
        const lastHomeId = localStorage.getItem('lastHomeId');
        if (lastHomeId && res.data.some(h => h._id === lastHomeId)) {
          setSelectedHomeId(lastHomeId);
        } else {
          setSelectedHomeId(res.data[0]._id);
          localStorage.setItem('lastHomeId', res.data[0]._id);
        }
      }
    }
    fetchHomes();
  }, []);

  // load selected home details
  useEffect(() => {
    if (!selectedHomeId) return;
    localStorage.setItem('lastHomeId', selectedHomeId); // persist selection
    async function fetchHome() {
      const res = await api.get(`/homes/${selectedHomeId}`);
      setHomeDetails(res.data);
    }
    fetchHome();
  }, [selectedHomeId]);

  // total lights for card
  const totalLights = homeDetails ? homeDetails.lights.length : 0;
  const onCount = homeDetails ? homeDetails.lights.filter(l => l.on).length : 0;

  if (!user) return null;

  return (
    <div className="app-frame">
      <div className="app-card">
        <Sidebar variant="dashboard"
          user={user}
          homes={homes}
          selectedHomeId={selectedHomeId}
          onHomeClick={(id) => setSelectedHomeId(id)}
        />

        <main className="main ">
          <header className="main-header">
            <div>
              <h1>Dashboard</h1>
              <p className="subtitle">Manage and monitor your home automation</p>
            </div>
          </header>

          <section className="cards slide-up">
            <div className="card status-card" onClick={(id) => navigate(`/homes/${selectedHomeId}/lights`)}>
              <h3>Status</h3>
              <div className="bars">
                <div className="bar-row">
                  <div className="bar-label">On</div>
                  <div className="bar-wrap">
                    <div className="bar-inner" style={{ width: `${(onCount / Math.max(totalLights,1)) * 100}%` }} />
                  </div>
                  <div className="bar-number">{onCount}</div>
                </div>

                <div className="bar-row">
                  <div className="bar-label">Off</div>
                  <div className="bar-wrap">
                    <div className="bar-inner off" style={{ width: `${((totalLights - onCount) / Math.max(totalLights,1)) * 100}%` }} />
                  </div>
                  <div className="bar-number">{totalLights - onCount}</div>
                </div>
              </div>
               <div className="pie-chart-wrapper" style={{ height: "250px", marginTop: "40px",maxWidth:"75%"}} >
            <LightsPieChart lights={homeDetails ? homeDetails.lights : []} />
            </div>
            </div>

            <div className="card total-card">
              <h3>Total Lights</h3>
              <div className="big-number">{totalLights}</div>
              <div className="muted">lights</div>
            </div>
          </section>
        
            
        </main>
      </div>
    </div>
  );
}
