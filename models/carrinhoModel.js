const mongoose = require('mongoose');

const CarrinhoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  itens: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
    quantidade: { type: Number, default: 1 }
  }]
});

module.exports = mongoose.model('Carrinho', CarrinhoSchema);
