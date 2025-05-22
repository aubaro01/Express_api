const fs = require('fs');
const crypto = require('crypto');
const Blockchain = require('../blockchain/blockchain');
const BlockModel = require('../models/block');
const UserModel = require('../models/userModel');

const blockchain = new Blockchain();

const uploadDocument = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User dont Exist' });
    }

    const fileBuffer = fs.readFileSync(req.file.path);
    const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    const newBlock = blockchain.addBlock(fileHash);

    const newBlockDoc = new BlockModel({
      ...newBlock,
      filename: req.file.filename,
      originalName: req.file.originalname,
      uploadedBy: user.name
    });

    await newBlockDoc.save();

    res.status(201).json({
      message: 'Document register with sucess!',
      block: newBlockDoc
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error with the upload' });
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
