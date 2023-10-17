import express from 'express';

const router = express.Router();

const usersRouter = require('./users');

router.use('/user', usersRouter);

module.exports = router;
