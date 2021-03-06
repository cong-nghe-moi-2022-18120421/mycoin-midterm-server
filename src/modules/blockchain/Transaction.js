import SHA256 from 'crypto-js/sha256';
import pkg from 'elliptic';
const { ec: EC } = pkg;
const ec = new EC('secp256k1');

export default class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.timestamp = new Date().getTime();

    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.fromAddress + this.toAddress + this.amount + this.timestamp
    ).toString();
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transactions on other wallets!');
    }

    const hashTx = this.calculateHash();
    const signature = signingKey.sign(hashTx, 'base64');
    this.signature = signature.toDER('hex');
  }

  isValid() {
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction!');
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}
