const user = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  const usuarioExistente = await user.findOne({ email });
  if (usuarioExistente) return res.status(400).json({ msg: 'Usuário já existe' });

  const hashedSenha = await bcrypt.hash(senha, 10);
  const novoUsuario = await user.create({ nome, email, senha: hashedSenha });

  res.status(201).json({ msg: 'Usuário criado com sucesso!' });
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await user.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

  const senhaCorreta = await bcrypt.compare(senha, user.senha);
  if (!senhaCorreta) return res.status(401).json({ msg: 'Senha incorreta' });

  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, user: { nome: user.nome, email: user.email, isAdmin: user.isAdmin } });
};
