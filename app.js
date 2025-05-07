const express = require('express');
require('dotenv').config(); 
const cors = require('cors');
const path = require('path');
const { send } = require('process');
const app = express(); 


app.use(cors({
  origin: process.env.API_URL
}));

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/v1', (rep, resp) =>{
  res.status(200).json({ message: 'Primeira versão da api online!' });
});

module.exports = (req, res) => {
  app(req, res);  
};