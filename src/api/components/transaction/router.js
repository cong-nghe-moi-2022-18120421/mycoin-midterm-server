import express from 'express';
import transactionControllers from './controllers';

const transactionRouter = express.Router();

//======================== GET ========================
//======================== POST ========================
transactionRouter.post('/send', transactionControllers.sendCoin);
//======================== PUT ========================
//======================== DELETE ========================

export default transactionRouter;
