require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5137'],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

// Routes
const indexRouter = require('./routes');

app.use('/api', indexRouter);

app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
