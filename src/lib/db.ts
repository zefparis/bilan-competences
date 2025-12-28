// Neutralized to avoid @libsql/client issues on Windows during local dev
// All logic has been moved to Prisma

export function getDb(): any {
  throw new Error("getDb() is deprecated. Please use Prisma instead.");
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
