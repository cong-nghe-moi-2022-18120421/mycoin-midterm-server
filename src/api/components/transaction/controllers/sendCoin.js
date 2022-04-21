import myCoin from '../../../start/blockchain';
import walletServices from '../../wallet/service';
import Transaction from '../../../../modules/blockchain/Transaction';
import pkg from 'elliptic';
const { ec: EC } = pkg;
const ec = new EC('secp256k1');

const sendCoin = (req, res) => {
  const { privateKey, fromAddress, toAddress, amount } = req.body;

  const myKey = ec.keyFromPrivate(privateKey);

  // check if balance is enough
  const balance = walletServices.getBalance(fromAddress);
  if (balance < amount) {
    return res.status(400).send({
      message: 'Not enough balance to process this transaction',
    });
  }

  const newTx = new Transaction(fromAddress, toAddress, amount);
  newTx.signTransaction(myKey);
  myCoin.addTransaction(newTx);

  res.status(200).send({
    message: 'Added transaction to pending transactions',
  });
};

export default sendCoin;
