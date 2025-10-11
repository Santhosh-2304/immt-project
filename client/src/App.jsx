// client/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Lights from './pages/Lights';
import User from './pages/User';
import UserCreate from './pages/UserCreate';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateUser from './UserActions/UpdateUser';



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/homes/:id/lights" element={<ProtectedRoute><Lights /></ProtectedRoute>} />
      <Route path="/User" element={<ProtectedRoute><User /></ProtectedRoute>}/>
      <Route path="/UserCreate" element={<ProtectedRoute><UserCreate/></ProtectedRoute>}/>
      <Route path="/update/:id" element={<UpdateUser />}/>
    </Routes>
  );
}
