require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

import indexRouter from './routes/index';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
//app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json('Hello World!');
});

app.use('/api', indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
