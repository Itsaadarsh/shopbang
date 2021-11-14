import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { json } from 'body-parser';
import { login } from './routes/auth/login';
import { register } from './routes/auth/register';
import { getUser } from './routes/getUserDetails';
import log from './logger/log';
import { updateUser } from './routes/updateUserDetails';
import { referralRegister } from './routes/auth/referralRegister';
import { getProducts } from './routes/getProducts';
import { reviewProduct } from './routes/postProductReview';
import { getReview } from './routes/getReviews';

const dotenv = require('dotenv');
const app = express();
const httpserver = require('http').createServer(app);
const PORT = process.env.PORT || 4000;

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

dotenv.config();

app.use(json());
app.use(cors());

app.use('/api/v1', getUser);
app.use('/api/v1', updateUser);
app.use('/api/v1', register);
app.use('/api/v1', referralRegister);
app.use('/api/v1', login);
app.use('/api/v1', getProducts);
app.use('/api/v1', reviewProduct);
app.use('/api/v1', getReview);

httpserver.listen(PORT, async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  log.info('Connected to Database');
  log.info(`Listening at -  ${process.env.DEV_HOST}${PORT}/api/v1`);
});
