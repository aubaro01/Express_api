const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Error tryng find for users', error: err.message });
  }
};

exports.registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await userModel.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ msg: 'Users always exist!!' });

    const hashedSenha = await bcrypt.hash(senha, 10);
    const novoUsuario = await userModel.create({ name, email, senha: hashedSenha });

    res.status(201).json({ msg: 'User create with sucess! ' });
  } catch (err) {
    res.status(500).json({ msg: 'Error tryng register User!!!', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User don´t Exist!' });

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) return res.status(401).json({ msg: 'Wrong Password!' });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error with Login', error: err.message });
  }
};
