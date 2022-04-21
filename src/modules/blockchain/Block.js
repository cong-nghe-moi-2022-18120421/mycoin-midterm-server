import SHA256 from 'crypto-js/sha256';

export default class Block {
  constructor(
    index,
    timestamp,
    transactions,
    previousHash = '',
    difficulty = 1,
    nonce = 0
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.difficulty = difficulty;
    this.nonce = nonce;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.difficulty +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty, miner) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    this.difficulty = difficulty;
    this.miner = miner;
    console.log('block mined: ' + this.hash);
  }

  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }

    return true;
  }
}
