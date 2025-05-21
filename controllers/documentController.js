const fs = require('fs');
const crypto = require('crypto');
const Blockchain = require('../blockchain/blockchain');
const BlockModel = require('../models/block');
const UserModel = require('../models/userModel');

// Blockchain instância única
const blockchain = new Blockchain();

const uploadDocument = async (req, res) => {
  try {
    const { userId } = req.body;

    // 1. Buscar usuário
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // 2. Ler arquivo e gerar hash
    const fileBuffer = fs.readFileSync(req.file.path);
    const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // 3. Criar bloco e adicionar na blockchain
    const newBlock = blockchain.addBlock(fileHash);

    // 4. Salvar no MongoDB
    const newBlockDoc = new BlockModel({
      ...newBlock,
      filename: req.file.filename,
      originalName: req.file.originalname,
      uploadedBy: user.name
    });

    await newBlockDoc.save();

    res.status(201).json({
      message: 'Documento registrado com sucesso!',
      block: newBlockDoc
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao processar o upload' });
  }
};

const getBlockchain = (req, res) => {
  res.json(blockchain.chain);
};

const validateChain = (req, res) => {
  const isValid = blockchain.isChainValid();
  res.json({ valid: isValid });
};

module.exports = {
  uploadDocument,
  getBlockchain,
  validateChain
};
