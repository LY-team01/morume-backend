import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const main = async () => {
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        nickname: faker.internet.username(),
        avatarUrl: faker.image.avatar(),
      },
    });

    await prisma.filter.create({
      data: {
        userId: user.id,
        parameters: {
          brightness: faker.number.int({ min: 0, max: 100 }),
          skin: faker.number.int({ min: 0, max: 100 }),
          contour: faker.number.int({ min: 0, max: 100 }),
          eye: faker.number.int({ min: 0, max: 100 }),
          nose: faker.number.int({ min: 0, max: 100 }),
          mouth: faker.number.int({ min: 0, max: 100 }),
        },
      },
    });
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🌱 Seeding completed successfully 🌱');
  });
