import express, { Request, Response } from 'express';
import { PrismaClient, User_role } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { check, validationResult, Result } from 'express-validator';
import { auth } from '../middleware';

const SALT = process.env.SALT;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_TOKEN = process.env.JWT_TOKEN;
const NODE_ENV = process.env.NODE_ENV;

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  '/',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const include = req.query.include_password;
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          password: include === 'true' ? true : false,
        },
      });
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  '/roles',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const roles = Object.values(User_role);
      res.status(200).json(roles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  '/role/:role',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      if (!Object.values(User_role).includes(req.params.role as User_role)) {
        return res.status(500).json('Invalid role');
      }
      const users = await prisma.user.findMany({
        where: {
          role: {
            has: req.params.role as User_role,
          },
        },
      });
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  '/:id',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const include = req.query.include_password;
      const user = await prisma.user.findUnique({
        where: {
          id: req.params.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          password: include === 'true' ? true : false,
        },
      });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  '/register' /* auth, */,
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
      .isLength({ min: 5, max: 20 })
      .withMessage('Password must be between 5 and 20 characters'),
    check('role')
      .notEmpty()
      .withMessage('Role is required')
      .trim()
      .isIn(Object.values(User_role)),
  ],
  async (req: Request, res: Response) => {
    try {
      const result: Result = validationResult(req);

      if (!result.isEmpty()) {
        console.log(result.array());
        return res.status(500).json(result.array());
      }

      const { name, email, password, role } = req.body;

      const userExists = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (userExists) {
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
    } catch (error) {
      res.status(500).json({ error });
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
      .isLength({ min: 5, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    try {
      const result: Result = validationResult(req);

      if (!result.isEmpty()) {
        return res.status(500).json(result.array());
      }

      const { email, password } = req.body;
      const includeToken = req.query.include_token;

      const user = await prisma.user.findUnique({
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
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };

      const token = jwt.sign(payload, JWT_SECRET as Secret, {
        expiresIn: JWT_EXPIRES_IN,
        issuer: JWT_ISSUER,
      });

      if (includeToken === 'true') {
        res.cookie(JWT_TOKEN as string, token, {
          httpOnly: true,
          secure: NODE_ENV === 'production',
        });
      }

      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: includeToken === 'true' ? token : '',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err });
    }
  }
);

router.put(
  '/:id',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.delete(
  '/logout',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      res.clearCookie(JWT_TOKEN as string);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.delete(
  '/:id',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.delete({
        where: { id: req.params.id },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

module.exports = router;
