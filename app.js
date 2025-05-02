const express = require('express');
require('dotenv').config(); 
const cors = require('cors');

const app = express(); 


app.use(cors({
  origin: process.env.API_URL
}));

app.use(express.json()); 


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = (req, res) => {
  app(req, res);  
};