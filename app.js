const express = require('express');
require('dotenv').config();

class App {
  constructor() {
    this.server = express();
    this.server.set('NODE_ENV', process.env.NODE_ENV);
    this.server.set('TZ', process.env.TZ);
    this.server.set('PORT', process.env.PORT || 5500);

    this.middlewares();
    this.routes();
    this.globalErrorHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    //this.server.use(routes);
    this.server.get('/', (req, res) => {
      return res.status(200).json({
        message: 'Hello world',
      });
    });

    this.server.use('/api/fruits', require('./routes/fruits.routes'));
  }

  globalErrorHandler() {
    this.server.use((err, req, res, next) => {
      err.statusCode = err.statusCode || 500;
      err.status = err.status || 'error';

      if (err.message === 'Request Validation Error') {
        return res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
          error: err.error,
        });
      }

      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    });
  }
}

module.exports = new App().server;
