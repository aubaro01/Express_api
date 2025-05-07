const express = require('express');
require('dotenv').config(); 
const cors = require('cors');
const path = require('path');
const { send } = require('process');
const app = express(); 
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/produtosRoute');
const paymentRoutes = require('./routes/pagamentoRoute');
const carRoutes = require('./routes/carrinhoRoute');
const categoryRoutes = require('./routes/categoriaRoute');
const authRoutes = require('./routes/userRoute');

app.use(cors({
  origin: process.env.API_URL
}));

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

//Rota principal / docs da api
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Rotas da api 
app.use('/v1', userRoutes); 
app.use('/v1', productRoutes); 
app.use('/v1', paymentRoutes); 
app.use('/v1', carRoutes); 
app.use('/v1', categoryRoutes); 
app.use('/v1', authRoutes); 


module.exports = (req, res) => {
  app(req, res);  
};