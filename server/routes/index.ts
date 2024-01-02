import express from 'express';

const router = express.Router();

const userRouter = require('./user');
const campRouter = require('./camp');
const memberRouter = require('./member');

router.use('/user', userRouter);
router.use('/camp', campRouter);
router.use('/member', memberRouter);

module.exports = router;
