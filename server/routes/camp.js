const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const kampen = await prisma.kamp.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    res.status(200).json(kampen);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const kamp = await prisma.kamp.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(kamp);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const kamp = await prisma.kamp.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json(kamp);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const kamp = await prisma.kamp.delete({
      where: { id: req.params.id },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
