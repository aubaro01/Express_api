const Categoria = require('../models/categoriaModel');

exports.listarCategorias = async (req, res) => {
  const categorias = await Categoria.find();
  res.json(categorias);
};

exports.criarCategoria = async (req, res) => {
  const { nome, descricao } = req.body;

  const existe = await Categoria.findOne({ nome });
  if (existe) return res.status(400).json({ msg: 'Categoria já existe' });

  const novaCategoria = await Categoria.create({ nome, descricao });
  res.status(201).json(novaCategoria);
};
