const crypto = require('crypto');

class Block {
  constructor(index, timestamp, fileHash, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.fileHash = fileHash;
    this.previousHash = previousHash;
    this.hash = this.computeHash();
  }

  computeHash() {
    const data = this.index + this.timestamp + this.fileHash + this.previousHash;
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "GENESIS", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(fileHash) {
    const previousBlock = this.getLatestBlock();
    const newBlock = new Block(this.chain.length, Date.now(), fileHash, previousBlock.hash);
    this.chain.push(newBlock);
    return newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.hash !== current.computeHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

module.exports = Blockchain;
