const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create users
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Stef Van Nieuwenhove',
        email: 'stef@scouts.be',
        role: 'admin',
        password: 'admin',
      },
      {
        name: 'Ester podevyn',
        email: 'ester@scouts.be',
        role: 'groepsleiding',
        password: 'Groepsleiding',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${users.count} users`);

  // Create camps
  const camps = await prisma.kamp.createMany({
    data: [
      {
        name: 'overgangsweekend',
        start_date: '2023-09-15T00:00:00.000Z',
        end_date: '2023-09-17T00:00:00.000Z',
        cost_per_day: 12.5,
      },
      {
        name: 'paaskamp',
        start_date: '2023-04-10T00:00:00.000Z',
        end_date: '2023-04-11T00:00:00.000Z',
        cost_per_day: 15,
      },
      {
        name: 'zomerkamp_kort',
        start_date: '2023-07-21T00:00:00.000Z',
        end_date: '2023-07-26T00:00:00.000Z',
        cost_per_day: 15,
      },
      {
        name: 'zomerkamp_lang',
        start_date: '2023-07-21T00:00:00.000Z',
        end_date: '2023-07-30T00:00:00.000Z',
        cost_per_day: 17.5,
      },
    ],
  });

  console.log(`Created ${camps.count} camps`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
