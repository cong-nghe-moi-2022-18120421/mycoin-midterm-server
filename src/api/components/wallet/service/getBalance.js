import myCoin from '../../../start/blockchain';

const getBalance = (walletAddress) => {
  return myCoin.getBalance(walletAddress);
};

export default getBalance;
