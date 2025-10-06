// server/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");


// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
        return res.status(404).json({ message: "User data not found." });
         }
        res.json(users);
        
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
});

// Get one user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");
        res.json(user);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
  
});

// Update user (toggle active)
router.put("/update/:id", async (req, res) => {
    try {
        const userExist = await User.findById(req.params.id);
        if (!userExist) {
        return res.status(404).json({ message: "User not found." });
        }
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(user);
        res.status(200).json({ message: "User Updated successfully." });
    } catch (error) {
            res.status(500).json({ errorMessage: error.message });
    }
});

router.delete("/delete/:id",async (req,res) => {
    try {
        const userExist = await User.findById(req.params.id);
        if (!userExist) {
        return res.status(404).json({ message: "User not found." });
        }
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
})


module.exports = router;
