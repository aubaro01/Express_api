const Carrinho = require ("../models/carrinhoModel")


exports.verCarrinho = async (req, res) => {
  const carrinho = await Carrinho.findOne({ user: req.user.id }).populate('itens.produto');
  res.json(carrinho || { itens: [] });
};

exports.adicionarItem = async (req, res) => {
  const { produtoId, quantidade } = req.body;
  let carrinho = await Carrinho.findOne({ user: req.user.id });

  if (!carrinho) {
    carrinho = await Carrinho.create({
      user: req.user.id,
      itens: [{ produto: produtoId, quantidade }]
    });
  } else {
    const item = carrinho.itens.find(i => i.produto.toString() === produtoId);
    if (item) {
      item.quantidade += quantidade;
    } else {
      carrinho.itens.push({ produto: produtoId, quantidade });
    }
    await carrinho.save();
  }

  res.json(carrinho);
};

exports.removerItem = async (req, res) => {
  const { produtoId } = req.params;
  const carrinho = await Carrinho.findOne({ user: req.user.id });
  carrinho.itens = carrinho.itens.filter(i => i.produto.toString() !== produtoId);
  await carrinho.save();
  res.json(carrinho);
};
