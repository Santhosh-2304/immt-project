// server/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users  -> list all users (useful later)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users -> create a user
router.post('/', async (req, res) => {
  try {
    const { username, password, type, email, isActive, forgotPassword } = req.body;

    // basic required checks
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'username, password and email are required' });
    }

    // password must be exactly 8 characters
    if (typeof password !== 'string' || password.length !== 8) {
      return res.status(400).json({ message: 'Password must be exactly 8 characters' });
    }

    // at least one special character (non-alphanumeric)
    if (!/[^A-Za-z0-9]/.test(password)) {
      return res.status(400).json({ message: 'Password must include at least one special character' });
    }

    // basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // validate type
    const types = ['Normal', 'Super', 'Admin'];
    const finalType = types.includes(type) ? type : 'Normal';

    // create and save (password saved as plain text per request)
    const user = new User({
      username,
      password,
      type: finalType,
      email,
      isActive: !!isActive,
      forgotPassword: !!forgotPassword,
    });

    await user.save();
    // return created user (note: contains plaintext password)
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/users/:id -> update partial fields (e.g. isActive)
router.patch('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
