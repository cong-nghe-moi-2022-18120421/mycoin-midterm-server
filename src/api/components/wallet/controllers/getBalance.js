import walletServices from '../service';

const getBalance = (req, res) => {
  const { publicKey } = req.params;

  const balance = walletServices.getBalance(publicKey);

  res.status(200).send({
    balance: balance,
  });
};

export default getBalance;
