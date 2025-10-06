import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // <-- New state
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/auth/login', { name, email, password })
      .then(result => {
        const message = result.data.message;

        if (message === "Success") {
          localStorage.setItem('user', JSON.stringify({name,email})); // Store email or whatever you need
          navigate('/dashboard');
        } else {
          setErrorMessage(message); // Show error message
        }
      })
      .catch(err => {
        console.error(err);
        setErrorMessage("Something went wrong. Please try again.");
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className={`login-container ${animate ? 'animate' : ''}`}>
     <div className='login-left '>
     <div className="overlay slide-up">
          <h1>Smarter Living, Simplified</h1>
          <p>
            Manage, monitor, and automate every light in your home — all in one intuitive dashboard.
            Our system gives you complete control and insight into your connected spaces.
          </p>
          <button className="demo-btn">Watch Demo</button>
        </div>
      </div>
        <div className="login-right ">
          <div className="login-box slide-up">
          <h1>Welcome back</h1>
          <p>Sign in to manage your home automation</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
            </div>
            <div className='input-group'>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to all statements included in <a href="#">Terms of Use</a>
              </label>
            </div>
            <button type="submit" className="login-btn" style={{ marginTop: "10px" }}>Sign In</button>
          </form>

          {errorMessage && (
            <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
