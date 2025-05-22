const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  index: Number,
  timestamp: Number,
  fileHash: String,
  previousHash: String,
  hash: String,
  filename: String,
  originalName: String,
  uploadedBy: String
});

module.exports = mongoose.model('Block', blockSchema);
