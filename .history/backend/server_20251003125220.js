const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
