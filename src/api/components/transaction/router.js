import express from 'express';
import transactionControllers from './controllers';

const transactionRouter = express.Router();

//======================== GET ========================
transactionRouter.get('/', transactionControllers.getAll);
transactionRouter.get('/pending', transactionControllers.getPending);
transactionRouter.get('/:transactionHash', transactionControllers.getOneByHash);
//======================== POST ========================
transactionRouter.post('/send', transactionControllers.sendCoin);
//======================== PUT ========================
//======================== DELETE ========================

export default transactionRouter;
