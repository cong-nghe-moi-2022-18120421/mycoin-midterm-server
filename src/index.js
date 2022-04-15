const Transaction = require('./Transaction');
const Blockchain = require('./Blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate(
  '5df07b721f37408e7492c7f90d0b18815e141512972d7a3bce665304742967c5'
);
const myWalletAddress = myKey.getPublic('hex');

// try to log the blockchain to console
let myCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key here', 2);
tx1.signTransaction(myKey);
myCoin.addTransaction(tx1);

console.log('\nStart miner...');
myCoin.minePendingTransactions(myWalletAddress);

console.log('\nKhoa wallet: ', myCoin.getBalanceOfAddress(myWalletAddress));
