const express = require('express');

const router = express.Router();

// all the routes
const usersRouter = require('./users');

router.use('/user', usersRouter);

module.exports = router;
