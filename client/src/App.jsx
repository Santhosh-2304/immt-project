// client/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Lights from './pages/Lights';
import User from './pages/User';
import UserCreate from './pages/UserCreate';



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/homes/:id/lights" element={<Lights />} />
      <Route path="/User" element={<User />}/>
      <Route path="/UserCreate" element={<UserCreate/>}/>
    </Routes>
  );
}
