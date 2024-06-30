const express = require('express');
const cors = require('cors');
const atcoderRouter = require('./routes/atcoder'); // Import the router from atcoder.js

console.log('Server is starting');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Use the router for API routes
app.use('/api', atcoderRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});