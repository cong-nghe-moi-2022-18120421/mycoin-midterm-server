const Transaction = require('./Transaction');
const Blockchain = require('./Blockchain');

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
