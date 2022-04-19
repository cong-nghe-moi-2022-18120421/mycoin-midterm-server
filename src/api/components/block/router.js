import express from 'express';
import blockControllers from './controllers';

const blockRouter = express.Router();

//======================== GET ========================
blockRouter.get('/', blockControllers.getAll);
//======================== POST ========================
//======================== PUT ========================
//======================== DELETE ========================

export default blockRouter;
