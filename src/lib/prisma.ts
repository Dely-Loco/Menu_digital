// src/lib/prisma.ts
import { PrismaClient } from '../generated/prisma'; // ⚠️ Esto debe apuntar a tu carpeta de cliente generado

export const prisma = new PrismaClient();

