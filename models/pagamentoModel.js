const mongoose = require('mongoose');

const PagamentoSchema = new mongoose.Schema({
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  formaPagamento: {
    type: String,
    enum: ['Mbway', 'transferencia', 'cartao'],
    required: true
  },
  status: {
    type: String,
    enum: ['pendente', 'pago', 'falhou'],
    default: 'pendente'
  },
  valor: {
    type: Number,
    required: true
  },
  detalhes: {
    tipo: mongoose.Schema.Types.Mixed, 
    default: {}
  }
}, { timestamps: true });

module.exports = mongoose.model('Pagamento', PagamentoSchema);
