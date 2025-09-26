const mongoose = require('mongoose');

const LightSchema = new mongoose.Schema({
  name: { type: String, required: true },
  on: { type: Boolean, default: false }
});

const HomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lights: [LightSchema]
}, { timestamps: true });

module.exports = mongoose.model('Home', HomeSchema);
