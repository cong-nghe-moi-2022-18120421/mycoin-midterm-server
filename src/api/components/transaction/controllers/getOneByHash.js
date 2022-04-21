import transactionServices from '../services';

const getOneByHash = (req, res) => {
  const { transactionHash } = req.params;

  // get all transactions first
  const allTransactions = transactionServices.getAll();

  // loop and find
  const targetTransaction = allTransactions.find(
    (txn) => txn?.hash === transactionHash
  );

  return res.status(200).send(targetTransaction);
};

export default getOneByHash;
