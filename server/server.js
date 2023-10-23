// Dependecies
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes/index')
const cors = require('cors'); 
// Connections
const PORT = 3001
const app = express();
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Routes
app.use(routes);
// Open port
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });