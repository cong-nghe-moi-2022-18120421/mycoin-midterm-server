import myCoin from '../../../start/blockchain';

const getPending = (req, res) => {
  const { pendingTransactions } = myCoin;

  res.status(200).send(pendingTransactions);
};

export default getPending;
