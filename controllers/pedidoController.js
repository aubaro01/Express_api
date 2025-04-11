const Pedido = require("../models/pedidosModel");
const Produto = require ("../models/produtosModel");
const Carrinho = require ("../models/carrinhoModel");

exports.criarPedido = async (req, res) => {
  const { formaPagamento } = req.body;
  const carrinho = await Carrinho.findOne({ user: req.user.id }).populate('itens.produto');
  if (!carrinho || carrinho.itens.length === 0) {
    return res.status(400).json({ msg: 'Carrinho vazio' });
  }

  const valorTotal = carrinho.itens.reduce((acc, item) => acc + (item.produto.preco * item.quantidade), 0);

  const novoPedido = await Pedido.create({
    user: req.user.id,
    itens: carrinho.itens.map(item => ({
      produto: item.produto._id,
      quantidade: item.quantidade
    })),
    valorTotal,
    formaPagamento,
    status: 'pendente'
  });

  carrinho.itens = [];
  await carrinho.save();

  res.status(201).json(novoPedido);
};

exports.listarPedidosUsuario = async (req, res) => {
  const pedidos = await Pedido.find({ user: req.user.id }).populate('itens.produto');
  res.json(pedidos);
};
