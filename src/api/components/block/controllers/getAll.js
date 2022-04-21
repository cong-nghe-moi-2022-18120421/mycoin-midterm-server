import myCoin from '../../../start/blockchain';

const getAll = (req, res) => {
  const chain = myCoin.chain.reverse();

  res.status(200).send(chain);
};

export default getAll;
