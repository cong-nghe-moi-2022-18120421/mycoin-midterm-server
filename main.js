const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    this.difficulty = difficulty;
    console.log('block mined: ' + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.chainDifficulty = 2;
    // this.BLOCK_GENERATION_INTERVAL = 10; // seconds
    this.DIFFICULTY_ADJUSTMENT_INTERVAL = 10; // blocks
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2000', 'Genesis block', '');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  adjustChainDifficulty() {
    if (this.chain.length > this.DIFFICULTY_ADJUSTMENT_INTERVAL) {
      const preAdjustedBlock =
        this.chain[this.chain.length - this.DIFFICULTY_ADJUSTMENT_INTERVAL];
      if (preAdjustedBlock.difficulty === this.chainDifficulty) {
        this.chainDifficulty++;
      }
    }
  }

  addBlock(newBlock) {
    this.adjustChainDifficulty();
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.chainDifficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

// try to log the blockchain to console
let myCoin = new Blockchain();
console.log('mining coin 1...');
myCoin.addBlock(new Block(1, '02/01/2000', { amount: 4 }));
console.log('mining coin 2...');
myCoin.addBlock(new Block(2, '03/01/2000', { amount: 42 }));
console.log('mining coin 3...');
myCoin.addBlock(new Block(3, '03/01/2000', { amount: 42 }));
console.log('mining coin 4...');
myCoin.addBlock(new Block(4, '03/01/2000', { amount: 42 }));
console.log('mining coin 5...');
myCoin.addBlock(new Block(5, '03/01/2000', { amount: 42 }));
console.log(myCoin);
