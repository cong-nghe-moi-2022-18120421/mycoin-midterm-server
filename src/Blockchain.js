const Block = require('./Block');
const Transaction = require('./Transaction');

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
    const rewardTx = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions.push(rewardTx);

    const newBlock = new Block(
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );
    this.adjustChainDifficulty();
    newBlock.mineBlock(this.chainDifficulty);

    this.chain.push(newBlock);

    this.pendingTransactions = [];
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

module.exports = Blockchain;
