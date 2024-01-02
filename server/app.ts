require('dotenv').config();
import express, { Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

const PORT = process.env.PORT;

const corsOptions = {
  credentials: true,
  origin: true,
};

// Middlewares
app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const indexRouter = require('./routes');

app.use('/api', indexRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
