const { PrismaClient } = require('@prisma/client');

async function deleteAllData() {
  const prisma = new PrismaClient();

  try {
    await prisma.kamp.deleteMany();
    // Replace 'modelName' with the actual name of your model

    console.log('All data deleted successfully');
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllData();
