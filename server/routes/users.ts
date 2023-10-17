import express, { Request, Response } from 'express';
import { PrismaClient, User, User_role } from '@prisma/client';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware';

const router = express.Router();
const prisma: PrismaClient = new PrismaClient();

const SALT = process.env.SALT_ROUNDS || 10;
const JWT_SECRET = process.env.JWT_SECRET || 'uzihdauhfkjerhkfjhkzjrhfkjerhfk';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const JWT_ISSUER = process.env.JWT_ISSUER || 'scouts-server';
const JWT_TOKEN = process.env.JWT_TOKEN || 'token';
const NODE_ENV = process.env.NODE_ENV || 'development';

router.get(
  '/',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get('/:id', auth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(
  '/register',
  [
    check('name')
      .notEmpty()
      .withMessage('Name is required')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Name must be between 3 and 20 characters'),
    check('email').isEmail().withMessage('Email is required').trim(),
    check('password')
      .notEmpty()
      .withMessage('Password is required')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
    check('role')
      .notEmpty()
      .withMessage('Role is required')
      .trim()
      .isIn([
        User_role.admin,
        User_role.kapoen,
        User_role.wouter,
        User_role.jonggiver,
        User_role.giver,
        User_role.jin,
        User_role.board,
        User_role.parent,
      ]),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (errors.array().length > 0) {
        console.log(errors);
        return res.status(500).json({ 'Errors in validation': errors.array() });
      }

      const { name, email, password, role } = req.body;

      const userExists = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (userExists !== null) {
        return res.status(500).json('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, Number(SALT));

      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          role: role,
        },
      });

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .withMessage('Email is required')
      .trim()
      .normalizeEmail(),
    check('password')
      .notEmpty()
      .withMessage('Password is required')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (errors.array().length > 0) {
        console.log('Validation ', errors);
        return res.status(500).json('Errors in validation');
      }

      const { email, password } = req.body;

      const user: User | null = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user === null) {
        console.log('User does not exist');
        return res.status(500).json('User does not exist');
      }

      const validPassword = bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(500).json('Invalid password');
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        issuer: JWT_ISSUER,
      });

      res.cookie(JWT_TOKEN, token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
      });

      console.log({ user: user, token: token });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

router.post('/logout', async (req: Request, res: Response) => {
  try {
    res.clearCookie(JWT_TOKEN);
    res.status(200).json('User logged out');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
