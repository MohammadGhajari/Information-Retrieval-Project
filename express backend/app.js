const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const hpp = require('hpp');
const app = express();
const errorController = require('./controller/errorController');
const userRouter = require('./routes/userRoutes');
const websiteRouter = require('./routes/websiteRoutes');
const keywordRouter = require('./routes/keywordRoutes');
const queryRouter = require('./routes/queryRoutes');

//--------------------------MIDDLEWARES------------------------------
app.use(morgan('dev'));
const limiter = rateLimit({
  max: 1000,
  windowMs: 1000,
  message: 'too many requests. please try again in an hour.',
});
app.use(
  cors({
    origin: [
      'https://luthien-frontend.onrender.com',
      'http://127.0.0.10:8000',
      'https://luthien-tinuviel.netlify.app',
    ],
    credentials: true, // Allow credentials
  }),
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use('/', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(express.static(`public`));
app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.all('/', async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello World',
  });
});

app.use('/api/users', userRouter);
app.use('/api/queries', queryRouter);
app.use('/api/websites', websiteRouter);
app.use('/api/keywords', keywordRouter);

app.use(errorController);

module.exports = app;
