const express = require('express');
require('dotenv').config(); 
const cors = require('cors');

const app = express(); 


app.use(cors({
  origin: process.env.API_URL
}));

app.use(express.json()); 


app.get('/', (req, res) => {
  res.status(200).json({ message: 'API online!!' });
});

module.exports = (req, res) => {
  app(req, res);  
};