require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5137'],
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());
app.use(logger('dev'));

// Routes
import indexRouter from './routes';

app.get('/', (req: Request, res: Response) => {
  res.status(200).json('Hello World!');
});

app.use('/api', indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
