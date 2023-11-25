import { db as prisma } from "~/server/db";
import { defaultUsers } from "./user.data";

async function main() {
  await prisma.user.deleteMany({});

  const promises = defaultUsers.map((user) => {
    return prisma.user.create({
      data: user,
    });
  });

  return Promise.all(promises);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
