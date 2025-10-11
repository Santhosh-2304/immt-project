const express = require('express'); 
const User = require('../models/User'); 
const router = express.Router();

router.post('/login', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const users = await User.findOne({ email });

    if (users) {
      if (users.password === password) {
        res.json({ message: "Success" });
      } else {
        res.json({ message: "Password is incorrect" });
      }
    } else {
      res.json({ message: "User doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
