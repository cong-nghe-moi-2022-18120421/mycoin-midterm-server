import myCoin from '../../../start/blockchain';

const mineBlock = (req, res) => {
  const { minerAddress } = req.body;

  if (!minerAddress) {
    return res.status(400).send({
      message: 'Empty miner address',
    });
  }

  myCoin.minePendingTransactions(minerAddress);

  res.status(200).send({
    message: 'Successfully mined block!',
    block: myCoin.getLatestBlock(),
  });
};

export default mineBlock;
