import express from 'express';
import walletControllers from './controllers';

const walletRouter = express.Router();

//======================== GET ========================
walletRouter.get('/create', walletControllers.create);
walletRouter.get('/balance/:publicKey', walletControllers.getBalance);
//======================== POST ========================
//======================== PUT ========================
//======================== DELETE ========================

export default walletRouter;
