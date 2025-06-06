require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// In-memory data store for testing
const wardens = [
  {
    id: 1,
    staffNumber: 'FW001',
    firstName: 'John',
    lastName: 'Smith',
    location: 'King Alfred Centre',
    entryDateTime: new Date()
  },
  {
    id: 2,
    staffNumber: 'FW002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    location: 'West Downs Centre',
    entryDateTime: new Date()
  },
  {
    id: 3,
    staffNumber: 'FW003',
    firstName: 'Michael',
    lastName: 'Brown',
    location: 'Martial Rose Library',
    entryDateTime: new Date()
  }
];

// API: Get all wardens
app.get('/api/wardens', (req, res) => {
  res.json(wardens);
});

// API: Get warden by staff number
app.get('/api/wardens/:staffNumber', (req, res) => {
  const warden = wardens.find(w => w.staffNumber === req.params.staffNumber);
  if (!warden) {
    return res.status(404).json({ message: 'Warden not found' });
  }
  res.json(warden);
});

// API: Add a new warden
app.post('/api/wardens', (req, res) => {
  const { staffNumber, firstName, lastName, location } = req.body;
  
  // Basic validation
  if (!staffNumber || !firstName || !lastName) {
    return res.status(400).json({ message: 'Staff number, first name, and last name are required' });
  }
  
  // Check if warden already exists
  if (wardens.some(w => w.staffNumber === staffNumber)) {
    return res.status(409).json({ message: 'Warden with this staff number already exists' });
  }
  
  const newWarden = {
    id: wardens.length + 1,
    staffNumber,
    firstName,
    lastName,
    location: location || 'Not specified',
    entryDateTime: new Date()
  };
  
  wardens.push(newWarden);
  res.status(201).json({ message: 'Warden added successfully', data: newWarden });
});

// API: Update warden
app.put('/api/wardens/:staffNumber', (req, res) => {
  const { firstName, lastName, location } = req.body;
  
  // Basic validation
  if (!firstName || !lastName) {
    return res.status(400).json({ message: 'First name and last name are required' });
  }
  
  // Find warden
  const wardenIndex = wardens.findIndex(w => w.staffNumber === req.params.staffNumber);
  if (wardenIndex === -1) {
    return res.status(404).json({ message: 'Warden not found' });
  }
  
  // Update warden
  wardens[wardenIndex] = {
    ...wardens[wardenIndex],
    firstName,
    lastName,
    location: location || wardens[wardenIndex].location,
    entryDateTime: new Date()
  };
  
  res.json({ message: 'Warden updated successfully', data: wardens[wardenIndex] });
});

// API: Delete warden
app.delete('/api/wardens/:staffNumber', (req, res) => {
  // Find warden
  const wardenIndex = wardens.findIndex(w => w.staffNumber === req.params.staffNumber);
  if (wardenIndex === -1) {
    return res.status(404).json({ message: 'Warden not found' });
  }
  
  // Delete warden
  wardens.splice(wardenIndex, 1);
  res.json({ message: 'Warden deleted successfully' });
});

// API: Get all locations
app.get('/api/locations', (req, res) => {
  const locations = [
    'Alwyn Hall',
    'Beech Glade',
    'Bowers Building',
    'Burma Road Student Village',
    'Centre for Sport',
    'Chapel',
    'The Cottage',
    'Fred Wheeler Building',
    'Herbert Jarman Building',
    'King Alfred Centre',
    'Martial Rose Library',
    'Medecroft',
    'The Stripe',
    'Business School',
    'West Downs Centre',
    'Not on campus'
  ];
  
  res.json(locations);
});

// Base route
app.get('/', (req, res) => {
  res.send('Fire Warden API (Test Mode) is running');
});

// Start server
const PORT = 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api`);
});