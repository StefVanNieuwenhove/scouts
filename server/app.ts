require('dotenv').config();
import express, { Request, Response } from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes');

app.get('/', (req: Request, res: Response) => {
  res.status(200).json('Hello World!');
});

app.use('/api', indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
