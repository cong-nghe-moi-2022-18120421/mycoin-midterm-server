import express from 'express';
import walletControllers from './controllers';

const walletRouter = express.Router();

//======================== GET ========================
walletRouter.get('/create', walletControllers.create);
walletRouter.get('/balance/:publicKey', walletControllers.getBalance);
walletRouter.get('/info/:address', walletControllers.getInfoByAddress);
//======================== POST ========================
//======================== PUT ========================
//======================== DELETE ========================

export default walletRouter;
