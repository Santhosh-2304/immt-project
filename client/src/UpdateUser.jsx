// client/src/pages/UserCreate.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate,useParams } from 'react-router-dom';
import '../styles.css'; // ensure this is present in your project

export default function UpdateUser() {
  const [username, setUsername] = useState('');
  const [type, setType] = useState('Normal');
  const [email, setEmail] = useState('');
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();
  const {id}=useParams();
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

useEffect(() => {
    api.get(`/users/${id}`)
    .then((response) => {
        const u = response.data;
        setUsername(u.username );
        setType(u.type );
        setEmail(u.email );
        setIsActive(u.isActive);
    })
    .catch((error) => {
        console.log(error);
      });
  }, [id]);

  function validate() {
    const e = {};
    if (!username.trim()) e.username = 'Username is required';
    if (!['Normal', 'Super', 'Admin'].includes(type)) e.type = 'Invalid user type';
    return e;
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setSuccessMessage(null);
    setSubmitError(null);

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    try {
      const payload = {
        username,
        type,
        email,
        isActive,
      };
      await api.patch(`/users/${id}`, payload);
      setSuccessMessage('User updated successfully');
      // reset form
      setUsername('');
      setType('Normal');
      setEmail('');
      setIsActive(true);
      setErrors({});
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to update user';
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: 720, background: 'rgba(253, 253, 253, 1)', borderRadius: 12, boxShadow: '0 8px 24px rgba(16,24,40,0.08)', padding: 28 ,height:550,margin:50}}>
        <button className="btn outline" onClick={() => navigate('/User')} style={{marginBottom:"10px"}}>Back</button>
        <h2 style={{ marginTop: 0 ,textAlign:"center"}}>Update User</h2>

        {successMessage && <div className="alert success" style={{ marginBottom: 12 }}>{successMessage}</div>}
        {submitError && <div className="alert error" style={{ marginBottom: 12 }}>{submitError}</div>}
        <div className='create-left slide-up'>
        <form onSubmit={handleSubmit} className="user-create-form " noValidate>
          <div className="form-row">
            <label className="form-label">Username</label>
            <input className="form-input" value={username} onChange={e => setUsername(e.target.value)} />
            {errors.username && <div className="field-error">{errors.username}</div>}
          </div>

          <div className="form-row">
            <label className="form-label">User Type</label>
            <select className="form-input"  value={type} onChange={e => setType(e.target.value)}>
              <option value="Normal">Normal</option>
              <option value="Super">Super</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.type && <div className="field-error">{errors.type}</div>}
          </div>

          <div className="form-row">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value= {email} onChange={e => setEmail(e.target.value)} />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="form-row" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
              Is Active
            </label>
          </div>

          <div style={{ marginTop: 40 }}>
            <button className="btn" type="submit" disabled={submitting} style={{background:'linear-gradient(90deg, #72b2ffff, #7381ffff)'}}>
              {submitting ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
