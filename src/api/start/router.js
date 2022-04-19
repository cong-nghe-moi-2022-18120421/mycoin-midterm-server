import blockRouter from '../components/block/router';
import transactionRouter from '../components/transaction/router';
import walletRouter from '../components/wallet/router';

const startRouter = (app) => {
  app.use('/wallet', walletRouter);
  app.use('/transactions', transactionRouter);
  app.use('/blocks', blockRouter);

  //404
  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });
  //500 - Error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message,
      status: err.status || 500,
    });
  });
};

export default startRouter;
