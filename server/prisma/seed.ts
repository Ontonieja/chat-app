import { PrismaClient } from "@prisma/client";
import db from "./db";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPasswords = await Promise.all([
    bcrypt.hash("password", 12),
    bcrypt.hash("password", 12),
  ]);

  const jack = await db.user.upsert({
    where: { email: "test1@example.com" },
    update: {},
    create: {
      email: "test1@example.com",
      password: hashedPasswords[0],
      userName: "JackTest100",
      firstName: "Jack",
      lastName: "Test",
      avatar: "/src/assets/avatar2.png",
    },
  });

  const annie = await db.user.upsert({
    where: { email: "test2@example.com" },
    update: {},
    create: {
      email: "test2@example.com",
      password: hashedPasswords[1],
      userName: "AnnieTest200",
      firstName: "Annie",
      lastName: "Test",
      avatar: "/src/assets/avatar1.png",
    },
  });

  const robert = await db.user.upsert({
    where: { email: "test3@example.com" },
    update: {},
    create: {
      email: "test3@example.com",
      password: hashedPasswords[1],
      userName: "RobertTest300",
      firstName: "Robert",
      lastName: "Pattinson",
      avatar: "/src/assets/avatar4.png",
    },
  });
  console.log(`Users have been seeded`);
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
