import express from 'express';
import { PrismaClient, User_role } from '@prisma/client';
import { check, validationResult, Result } from 'express-validator';

const router = express.Router();
module.exports = router;
