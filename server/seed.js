const mongoose = require('mongoose');
require('dotenv').config();
const Service = require('./models/Service');

const services = [
  {
    name: 'ECU Remap – Stage 1',
    description: 'Software tune for naturally aspirated and turbocharged engines. Improves throttle response, torque curve, and overall power output without hardware changes.',
    price: 350,
    category: 'tuning',
    duration: '3 hours',
  },
  {
    name: 'ECU Remap – Stage 2',
    description: 'Advanced map designed for vehicles with upgraded intake, exhaust, and intercooler. Significant power gains with full dyno validation.',
    price: 550,
    category: 'tuning',
    duration: '5 hours',
  },
  {
    name: 'Suspension Alignment & Setup',
    description: 'Four-wheel alignment with camber, caster, and toe adjustment. Ideal after lowering springs or coilover installation.',
    price: 120,
    category: 'tuning',
    duration: '2 hours',
  },
  {
    name: 'Full Engine Diagnostic',
    description: 'Comprehensive OBD scan and live data analysis covering fuel trims, misfires, sensor health, and fault codes with a written report.',
    price: 80,
    category: 'repair',
    duration: '1 hour',
  },
  {
    name: 'Brake Pad & Disc Replacement',
    description: 'Supply and fit performance or OEM brake pads and discs on one axle. Includes brake fluid top-up and road test.',
    price: 200,
    category: 'repair',
    duration: '2 hours',
  },
  {
    name: 'Timing Belt & Water Pump Kit',
    description: 'Full timing belt kit replacement including tensioners, idler pulleys, and water pump. Critical maintenance for interference engines.',
    price: 480,
    category: 'maintenance',
    duration: '6 hours',
  },
  {
    name: 'Full Service (Oil, Filter, Fluids)',
    description: 'Engine oil and filter change, brake fluid, coolant check, air filter inspection, and 30-point vehicle check.',
    price: 95,
    category: 'maintenance',
    duration: '1.5 hours',
  },
  {
    name: 'Exhaust System Upgrade',
    description: 'Cat-back or turbo-back exhaust installation. We source and fit performance systems from leading brands or fabricate custom sections.',
    price: 600,
    category: 'tuning',
    duration: '4 hours',
  },
];

async function seed() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/revup-garage';
  await mongoose.connect(MONGO_URI);
  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log(`Seeded ${services.length} services`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
