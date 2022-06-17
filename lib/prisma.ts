import { PrismaClient } from "@prisma/client";

let global = {} as any;

const prisma: PrismaClient | undefined = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
