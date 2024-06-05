const express = require('express');
const fs = require('fs'); // Node.js file system module
const app = express();
var cors = require('cors');
const PORT = process.env.PORT || 3000;

// Read data from db.json
const jsonData = JSON.parse(fs.readFileSync('db.json', 'utf8'));

app.use(cors());

// Define a route to serve your JSON data
app.get('/api/data', (_req, res) => {
  res.json(jsonData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
