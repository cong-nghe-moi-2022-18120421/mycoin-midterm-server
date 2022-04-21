import sendCoin from './sendCoin';
import getPending from './getPending';
import getAll from './getAll';
import getOneByHash from './getOneByHash';

const transactionControllers = {
  sendCoin,
  getPending,
  getAll,
  getOneByHash,
};

export default transactionControllers;
