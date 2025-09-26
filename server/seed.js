/**
 * server/seed.js
 * Run `npm run seed` from server to populate demo data.
 */
const mongoose = require('mongoose');
const Home = require('./models/Home');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart-home';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB for seeding');

  // clear existing
  await Home.deleteMany({});

  // Home 1 (image-like): 10 lights
  const home1 = new Home({
    name: 'Home 1',
    lights: [
      { name: 'Living Room', on: true },
      { name: 'Kitchen', on: false },
      { name: 'Hallway', on: true },
      { name: 'Bedroom 1', on: true },
      { name: 'Bedroom 2', on: false },
      { name: 'Balcony',on: true },
      { name: 'Bathroom', on: false },
      { name: 'Study',  on: false },
      { name: 'Porch', on: false },
      { name: 'Garage', on: false }
    ]
  });

  // Home 2
  const home2 = new Home({
    name: 'Home 2', lights: [
      { name: 'Living', on: true },
      { name: 'Kitchen', on: false },
      { name: 'Study',on: false },
      { name: 'Balcony', on: true },
      { name: 'Workspace', on: true },
      { name: 'Bathroom', on: false },
      { name: 'Garage', on: false }
    ]
  });

  // Home 3
  const home3 = new Home({
    name: 'Home 3', lights: [
      { name: 'Studio', on: false },
      { name: 'Hall', on: true },
      { name: 'Porch',  on: true },
      { name: 'Bathroom', on: false },
    ]
  });

  await home1.save();
  await home2.save();
  await home3.save();

  console.log('Seeding complete');
  mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
