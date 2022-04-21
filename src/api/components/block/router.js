import express from 'express';
import blockControllers from './controllers';

const blockRouter = express.Router();

//======================== GET ========================
blockRouter.get('/', blockControllers.getAll);
blockRouter.get('/:index', blockControllers.getOneByIndex);
//======================== POST ========================
blockRouter.post('/mine', blockControllers.mineBlock);
//======================== PUT ========================
//======================== DELETE ========================

export default blockRouter;
