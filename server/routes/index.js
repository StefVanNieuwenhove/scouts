const express = require('express');

const router = express.Router();

// all the routes
const usersRouter = require('./users');
const campRouter = require('./camp');

router.use('/user', usersRouter);
router.use('/camp', campRouter);

module.exports = router;
