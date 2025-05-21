const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar usuários', error: err.message });
  }
};

exports.registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await userModel.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ msg: 'Usuário já existe' });

    const hashedSenha = await bcrypt.hash(senha, 10);
    const novoUsuario = await userModel.create({ nome, email, senha: hashedSenha });

    res.status(201).json({ msg: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao registrar usuário', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) return res.status(401).json({ msg: 'Senha incorreta' });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        nome: user.nome,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao fazer login', error: err.message });
  }
};
