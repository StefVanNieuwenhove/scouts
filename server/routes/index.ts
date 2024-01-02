import express from 'express';

const router = express.Router();

const userRouter = require('./user');
const campRouter = require('./camp');

router.use('/user', userRouter);
router.use('/camp', campRouter);

module.exports = router;
