import myCoin from '../../../start/blockchain';
import transactionServices from '../../transaction/services';

const getInfoByAddress = (req, res) => {
  const { address } = req.params;

  // get balance
  const balance = myCoin.getBalanceOfAddress(address);
  // get all transactions & filter
  const allTransactions = transactionServices.getAll();
  const transactions = allTransactions.filter(
    (txn) => txn.fromAddress === address || txn.toAddress === address
  );

  res.status(200).send({
    balance,
    transactions,
  });
};

export default getInfoByAddress;
