import express from 'express';

const router = express.Router();

import usersRouter from './users';

router.use('/user', usersRouter);

export default router;
