import express from 'express';
import walletControllers from './controllers';

const walletRouter = express.Router();

//======================== GET ========================
walletRouter.get('/create', walletControllers.create);
//======================== POST ========================
//======================== PUT ========================
//======================== DELETE ========================

export default walletRouter;
