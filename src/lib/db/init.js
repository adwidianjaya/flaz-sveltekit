import { drizzle } from "drizzle-orm/node-postgres";

let db;

export const init = async databaseUrl => {
  db = drizzle(databaseUrl);
  return db;
};
