import myCoin from '../../../start/blockchain';
import walletServices from '../../wallet/service';
import Transaction from '../../../../modules/blockchain/Transaction';

const sendCoin = (req, res) => {
  const { key, fromAddress, toAddress, amount } = req.body;

  // check if balance is enough
  const balance = walletServices.getBalance(fromAddress);
  if (balance < amount) {
    return res.status(400).send({
      message: 'Not enough balance to process this transaction',
    });
  }

  const newTx = new Transaction(fromAddress, toAddress, amount);
  newTx.signTransaction(key);
  myCoin.addTransaction(newTx);

  res.status(200).send({
    message: 'Added transaction to pending transactions',
  });
};

export default sendCoin;
