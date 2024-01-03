'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv').config();
const express_1 = __importDefault(require('express'));
const morgan_1 = __importDefault(require('morgan'));
const cors_1 = __importDefault(require('cors'));
const helmet_1 = __importDefault(require('helmet'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const body_parser_1 = __importDefault(require('body-parser'));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const corsOptions = {
  credentials: true,
  origin: true,
};
// Middlewares
app.use(express_1.default.static('public'));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Routes
const indexRouter = require('./routes');
app.use('/api', indexRouter);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});
// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
