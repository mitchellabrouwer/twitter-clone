import { PrismaClient } from "@prisma/client";

let global = {} as any;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;