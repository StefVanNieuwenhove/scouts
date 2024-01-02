import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { check, validationResult, Result } from 'express-validator';
import { auth } from '../middleware';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req: Request, res: Response) => {
  try {
    const camps = await prisma.camps.findMany({
      orderBy: {
        start_date: 'desc',
      },
    });
    res.status(200).json(camps);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get('/:id', auth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const camp = await prisma.camps.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(camp);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post(
  '/',
  [
    check('name').isLength({ min: 5 }),
    check('start_date').isDate(),
    check('end_date').isDate(),
    check('cost_per_day').isNumeric(),
    check('total_days').isNumeric(),
  ],
  /* auth, */ async (req: Request, res: Response) => {
    try {
      const errors: Result = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const camp = await prisma.camps.create({
        data: {
          ...req.body,
          start_date: new Date(req.body.start_date),
          end_date: new Date(req.body.end_date),
        },
      });
      res.status(200).json(camp);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
);

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const camp = await prisma.camps.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json(camp);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const camps = await prisma.camps.deleteMany();
    res.status(200).json(camps);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const camps = await prisma.camps.delete({
      where: { id: req.params.id },
    });
    res.status(200).json(camps);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
