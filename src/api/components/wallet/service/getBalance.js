import myCoin from '../../../start/blockchain';

const getBalance = (walletAddress) => {
  return myCoin.getBalanceOfAddress(walletAddress);
};

export default getBalance;
