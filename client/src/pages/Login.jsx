import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email });
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-right">
          <h1>Welcome back</h1>
          <p>Sign in to manage your home automation</p>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" required />
            <label>Password</label>
            <input type="password" placeholder="Password" />
            <button type="submit" className="btn-primary">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
