import { drizzle } from "drizzle-orm/node-postgres";

let db;

export const initDb = async databaseUrl => {
  db = drizzle(databaseUrl);
  return db;
};
