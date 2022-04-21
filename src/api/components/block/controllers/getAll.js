import myCoin from '../../../start/blockchain';

const getAll = (req, res) => {
  const chain = myCoin.chain;

  const reverseChain = chain.sort((a, b) => b.index - a.index);

  return res.status(200).send(reverseChain);
};

export default getAll;
