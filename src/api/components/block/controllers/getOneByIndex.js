import myCoin from '../../../start/blockchain';

const getOneByIndex = (req, res) => {
  const { index } = req.params;

  const chain = myCoin.chain;

  const block = chain[index];

  res.status(200).send(block);
};

export default getOneByIndex;
