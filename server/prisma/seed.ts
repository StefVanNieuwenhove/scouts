import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Stef Van Nieuwenhove',
        email: 'stef@scouts.be',
        role: ['admin', 'rvb', 'jin'],
        password: 'admin',
      },
      {
        name: 'Ester podevyn',
        email: 'ester@scouts.be',
        role: ['groepsleiding', 'rvb', 'jonggiver'],
        password: 'Groepsleiding',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${users.count} users`);

  // Create camps
  const camps = await prisma.camps.createMany({
    data: [
      {
        name: 'overgangsweekend',
        start_date: '2023-09-15T00:00:00.000Z',
        end_date: '2023-09-17T00:00:00.000Z',
        cost_per_day: 12.5,
        total_days: 2,
      },
      {
        name: 'paaskamp',
        start_date: '2023-04-10T00:00:00.000Z',
        end_date: '2023-04-13T00:00:00.000Z',
        cost_per_day: 15,
        total_days: 4,
      },
      {
        name: 'zomerkamp_kort',
        start_date: '2023-07-21T00:00:00.000Z',
        end_date: '2023-07-26T00:00:00.000Z',
        cost_per_day: 15,
        total_days: 5,
      },
      {
        name: 'zomerkamp_lang',
        start_date: '2023-07-21T00:00:00.000Z',
        end_date: '2023-07-31T00:00:00.000Z',
        cost_per_day: 17.5,
        total_days: 10,
      },
    ],
  });

  console.log(`Created ${camps.count} camps`);

  // Create members
  const members = await prisma.members.createMany({
    data: [
      {
        firstname: 'Janne',
        lastname: 'De Rouck',
        date_of_birth: '2011-03-17T00:00:00.000Z',
        member_id: '2011031701958',
        group: 'jonggivers',
        national_number: '11031713425',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${members.count} members`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    //process.exit(1);
  });
