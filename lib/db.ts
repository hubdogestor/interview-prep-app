import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Helper para conectar com timeout
export async function connectWithTimeout(timeoutMs = 5000) {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Database connection timeout')), timeoutMs)
  );

  try {
    await Promise.race([
      prisma.$connect(),
      timeout,
    ]);
    return true;
  } catch (error) {
    console.error('[DB] Connection failed:', error);
    return false;
  }
}

export default prisma;
