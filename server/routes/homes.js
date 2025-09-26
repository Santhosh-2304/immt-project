const express = require('express');
const router = express.Router();
const Home = require('../models/Home');

// GET /api/homes -> list all homes with basic counts
router.get('/', async (req,res) => {
  try {
    const homes = await Home.find();
    const result = homes.map(h => ({
      _id: h._id,
      name: h.name,
      totalLights: h.lights.length,
      onCount: h.lights.filter(l => l.on).length
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/homes/:id -> full home details
router.get('/:id', async (req,res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) return res.status(404).json({ message: 'Home not found' });
    res.json(home);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * PUT /api/homes/:id/lights
 * body:
 *  - { setAll: true, on: true }  -> set all lights on/off
 *  - { lights: [{ _id, on }, ...] } -> update specific lights
 */
router.put('/:id/lights', async (req,res) => {
  try {
    const { setAll, on, lights } = req.body;
    const home = await Home.findById(req.params.id);
    if (!home) return res.status(404).json({ message: 'Home not found' });

    if (setAll !== undefined) {
      home.lights.forEach(l => l.on = !!on);
    } else if (Array.isArray(lights)) {
      lights.forEach(update => {
        const l = home.lights.id(update._id);
        if (l) l.on = !!update.on;
      });
    }
    await home.save();
    res.json(home);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/homes/:id/lights/:lightId -> toggle one light
router.patch('/:id/lights/:lightId', async (req,res) => {
  try {
    const { on } = req.body;
    const home = await Home.findById(req.params.id);
    if (!home) return res.status(404).json({ message: 'Home not found' });
    const light = home.lights.id(req.params.lightId);
    if (!light) return res.status(404).json({ message: 'Light not found' });
    light.on = !!on;
    await home.save();
    res.json(home);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
