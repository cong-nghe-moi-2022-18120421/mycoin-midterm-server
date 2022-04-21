import myCoin from '../../../start/blockchain';

const getAll = (req, res) => {
  const { blockIndex } = req.query;

  const chain = [...myCoin.chain];
  const pendings = [...myCoin.pendingTransactions];

  const transactions = [];

  if (!blockIndex) {
    chain.forEach((block) => {
      const txs = block.transactions.map((tx) => ({
        ...tx,
        block: block.index,
      }));
      transactions.push(...txs);
    });

    pendings.forEach((txn) => {
      transactions.push(txn);
    });
  } else {
    const block = chain[blockIndex];
    const txs = block.transactions.map((tx) => ({
      ...tx,
      block: block.index,
    }));
    transactions.push(...txs);
  }

  return res.status(200).send(transactions.reverse());
};

export default getAll;
