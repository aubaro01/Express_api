const express = require('express');
require('dotenv').config(); 
const cors = require('cors');
const path = require('path');
const { send } = require('process');
const app = express(); 
const authRoute = require('./routes/userRoute');
const documentRoute = require('./routes/documentRoute');


app.use(cors({
  origin: process.env.API_URL
}));

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/v1', (rep, resp) =>{
  res.status(200).json({ message: 'First verson of API online!' });
});

app.use('/v1/users', authRoute);
app.use('/v1/documents', documentRoute);

module.exports = (req, res) => {
  app(req, res);  
};