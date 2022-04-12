const SHA256 = require('crypto-js/sha256');

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
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
    this.chain = [this.#createGenesisBlock()];
    this.chainDifficulty = 2;
    this.DIFFICULTY_ADJUSTMENT_INTERVAL = 10; // blocks
    // this.BLOCK_GENERATION_INTERVAL = 10; // minutes
    this.pendingTransactions = [];
    this.miningReward = 10;
  }

  #createGenesisBlock() {
    return new Block('01/01/2000', 'Genesis block', '');
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

  // addBlock(newBlock) {
  //   this.adjustChainDifficulty();
  //   newBlock.previousHash = this.getLatestBlock().hash;
  //   newBlock.mineBlock(this.chainDifficulty);
  //   this.chain.push(newBlock);
  // }
  minePendingTransactions(miningRewardAddress) {
    const newBlock = new Block(Date.now(), this.pendingTransactions);
    this.adjustChainDifficulty();
    newBlock.mineBlock(this.chainDifficulty);

    this.chain.push(newBlock);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
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
myCoin.createTransaction(new Transaction('add1', 'add2', 10));
myCoin.createTransaction(new Transaction('add2', 'add1', 5));

console.log('\nStart miner...');
myCoin.minePendingTransactions('khoa');

console.log('\nKhoa wallet: ', myCoin.getBalanceOfAddress('khoa'));

console.log('\nStart miner again...');
myCoin.minePendingTransactions('khoa');

console.log('\nKhoa wallet: ', myCoin.getBalanceOfAddress('khoa'));
