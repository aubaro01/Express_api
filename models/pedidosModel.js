const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itens: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, required: true }
  }],
  valorTotal: { type: Number, required: true },
  Envio: {
    tipo: { type: String, enum: ['normal', 'expresso'], default: 'normal' },
    valor: { type: Number, default: 0 }
  },
  enderecoEntrega: {
    rua: String,
    numero: String,
    cidade: String,
    concelho: String,
    postal: String
  },
  formaPagamento: {
    type: String,
    enum: ['Mbay', 'transferencia', 'cartao'],
    required: true
  },
  status: {
    type: String,
    enum: ['pendente', 'pago', 'processado', 'enviado', 'entregue', 'cancelado'],
    default: 'pendente'
  },
  pagamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pagamento',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Pedido', PedidoSchema);
