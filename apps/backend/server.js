// Vercel serverless entry point for Express backend
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// Import routes (handle default export from TypeScript compilation)
const mentalHealthRoutesModule = require('./dist/routes/mentalHealthRoutes');
const mentalHealthRoutes = mentalHealthRoutesModule.default || mentalHealthRoutesModule;

// Routes
app.use('/api/mental-health', mentalHealthRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Safe Haven Backend API is running' });
});

// Export for Vercel serverless
module.exports = app;

