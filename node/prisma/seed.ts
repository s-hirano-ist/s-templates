import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const sampleData1 = await prisma.stocks.upsert({
    // MEMO: UPSERT: if already exists then update, otherwise create
    where: { name: "G" },
    update: {},
    create: {
      name: "G",
      amount: 100,
    },
  });

  const sampleData2 = await prisma.stocks.upsert({
    where: { name: "F" },
    update: {},
    create: {
      name: "F",
      amount: 100,
    },
  });
  console.log({ sampleData1, sampleData2 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
