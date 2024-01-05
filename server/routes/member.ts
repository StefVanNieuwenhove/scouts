import express, { Request, Response } from 'express';
import { Lid_tak, PrismaClient } from '@prisma/client';
import { check, validationResult, Result } from 'express-validator';
import { auth, encrypt, decrypt } from '../middleware';

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  '/',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const decode: boolean = req.query.decrypt === 'true' ? true : false;
      const members = await prisma.members.findMany({
        orderBy: [
          { group: 'asc' },
          { lastname: 'asc' },
          { firstname: 'asc' },
          { date_of_birth: 'asc' },
        ],
      });

      console.log(members);

      if (decode) {
        members.forEach((member) => {
          if (member.national_number) {
            const decrypted = decrypt(
              member.national_number,
              member.iv,
              member.secret_key
            );
            member.national_number = decrypted;
          }
        });
      }

      res.status(200).json(members);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
);

router.get(
  '/roles',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const roles = Object.values(Lid_tak);
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.get(
  '/group/:group',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const { group } = req.params;
      const decode: boolean = req.query.decrypt === 'true' ? true : false;

      if (!Object.values(Lid_tak).includes(group as Lid_tak)) {
        return res.status(500).json('Invalid group');
      }

      const members = await prisma.members.findMany({
        where: {
          group: {
            equals: group as Lid_tak,
          },
        },
      });

      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.get(
  '/:id',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const decode: boolean = req.query.decrypt === 'true' ? true : false;
      const member = await prisma.members.findUnique({
        where: {
          id: id,
        },
      });

      if (!member) {
        return res.status(500).json('Member not found');
      }

      res.status(200).json(member);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.post(
  '/',
  [
    check('member_id')
      .isString()
      .isLength({ min: 13, max: 13 })
      .notEmpty()
      .withMessage('Member ID is required'),
    check('firstname')
      .isString()
      .notEmpty()
      .isLength({ min: 5, max: 20 })
      .withMessage('Firstname is required'),
    check('lastname')
      .isString()
      .notEmpty()
      .isLength({ min: 5, max: 50 })
      .withMessage('Lastname is required'),
    check('date_of_birth')
      .isDate()
      .notEmpty()
      .withMessage('Date of birth is required'),
    check('group').isIn(Object.values(Lid_tak)),
    check('national_number')
      /*  .isPassportNumber('BE') */
      .notEmpty()
      .withMessage('National number is required'),
  ],
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const result: Result = validationResult(req);

      if (!result.isEmpty()) {
        return res.status(500).json(result.array());
      }

      const exists = await prisma.members.findUnique({
        where: {
          member_id: req.body.member_id,
        },
      });

      if (exists) {
        return res.status(500).json('Member already exists');
      }

      const { data, iv, secret_key } = encrypt(req.body.national_number);
      console.log({ data, iv });

      if (!data) {
        return res.status(500).json('Failed to encrypt national number');
      }

      const member = await prisma.members.create({
        data: {
          ...req.body,
          date_of_birth: new Date(req.body.date_of_birth),
          national_number: data,
          secret_key: secret_key,
          iv: iv,
        },
      });
      res.status(200).json(member);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
);

router.put(
  '/:id',
  [
    check('member_id').isString().isLength({ min: 13, max: 13 }).optional(),
    check('firstname').isString().isLength({ min: 5, max: 20 }).optional(),
    check('lastname').isString().isLength({ min: 5, max: 50 }).optional(),
    check('date_of_birth').isDate().optional(),
    check('group').isIn(Object.values(Lid_tak)).optional(),
    check('national_number').isPassportNumber('BE').optional(),
  ] /* auth, */,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const member = await prisma.members.update({
        where: {
          id: id,
        },
        data: {
          ...req.body,
          date_of_birth: new Date(req.body.date_of_birth),
        },
      });
      res.status(200).json(member);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.delete(
  '/:id',
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const member = await prisma.members.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json(member);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

module.exports = router;
