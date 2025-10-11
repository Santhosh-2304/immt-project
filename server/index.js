// server/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const homesRoutes = require('./routes/homes');
const users = require('./routes/users');//create user

const app = express();

// Request logger (helps debug)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl} Origin: ${req.headers.origin || 'no-origin'}`);
  next();
});

// Allow requests from frontend dev server
app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true,
}));

app.use(express.json());

// connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart-home';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/homes', homesRoutes);
app.use('/api/users', users);//create user

const PORT = process.env.PORT || 5000;
// bind to IPv4 explicitly
app.listen(PORT, '127.0.0.1', ()=> console.log(`Server running on http://127.0.0.1:${PORT}`));
