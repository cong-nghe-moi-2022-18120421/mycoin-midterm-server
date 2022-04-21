import myCoin from '../../../start/blockchain';

const getAll = () => {
  const chain = [...myCoin.chain];
  const allTransactions = [];

  chain.forEach((block) => {
    const statusTransactions = block.transactions.map((txn) => ({
      ...txn,
      status: 'success',
      block: block.index,
    }));
    allTransactions.push(...statusTransactions);
  });

  const pendingTransactions = [...myCoin.pendingTransactions];
  pendingTransactions.forEach((txn) => {
    allTransactions.push({
      ...txn,
      status: 'pending',
    });
  });

  return allTransactions;
};

export default getAll;
