const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const SALT = process.env.SALT_ROUNDS || 10;
const JWT_SECRET = process.env.JWT_SECRET || 'uzihdauhfkjerhkfjhkzjrhfkjerhfk';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const JWT_ISSUER = process.env.JWT_ISSUER || 'scouts-server';
const JWT_TOKEN = process.env.JWT_TOKEN || 'token';
const NODE_ENV = process.env.NODE_ENV || 'development';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', auth, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
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
      .isLength({ min: 5, max: 20 })
      .withMessage('Password must be between 5 and 20 characters'),
    check('role')
      .notEmpty()
      .withMessage('Role is required')
      .trim()
      .isIn([
        'admin',
        'kapoen',
        'wouter',
        'jonggiver',
        'giver',
        'jins',
        'board',
        'parent',
      ]),
  ],
  async (req, res) => {
    try {
      const { errors } = validationResult(req);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
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
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (errors.array().length > 0) {
        console.log('Validation ', errors);
        return res.status(500).json('Errors in validation');
      }

      const { email, password } = req.body;

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

      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

router.put('/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
