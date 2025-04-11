const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  preco: { type: Number, required: true },
  estoque: { type: Number, required: true },
  imagem: String,
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Produto', ProdutoSchema);
