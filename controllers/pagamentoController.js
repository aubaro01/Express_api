const Pedido = require ("../models/pagamentoModel");

exports.simularPagamento = async (req, res) => {
  const { pedidoId } = req.params;

  const pedido = await Pedido.findById(pedidoId);
  if (!pedido || pedido.user.toString() !== req.user.id) {
    return res.status(404).json({ msg: 'Pedido não encontrado' });
  }

  pedido.status = 'pago';
  await pedido.save();

  res.json({ msg: 'Pagamento aprovado!', pedido });
};
