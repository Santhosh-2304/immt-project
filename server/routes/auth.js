const express = require('express');
const router = express.Router();

// Very simple login: no password checking, returns demo user
router.post('/login', async (req, res) => {
  const { email } = req.body;
  // In a real app check DB. Here we return a demo user
  const user = {
    name: 'Santhosh',
    email: email || 'Santhosh@123'
  };
  res.json(user);
});

module.exports = router;
