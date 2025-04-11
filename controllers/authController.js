const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) return res.status(400).json({ msg: 'Usuário já existe' });

  const hashedSenha = await bcrypt.hash(senha, 10);
  const novoUsuario = await Usuario.create({ nome, email, senha: hashedSenha });

  res.status(201).json({ msg: 'Usuário criado com sucesso!' });
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(404).json({ msg: 'Usuário não encontrado' });

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) return res.status(401).json({ msg: 'Senha incorreta' });

  const token = jwt.sign({ id: usuario._id, isAdmin: usuario.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, usuario: { nome: usuario.nome, email: usuario.email, isAdmin: usuario.isAdmin } });
};
