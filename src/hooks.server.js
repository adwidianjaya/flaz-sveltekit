import { DATABASE_URL } from "$env/static/private";
import { initDb } from "$lib/db/init";
import { sequence } from "@sveltejs/kit/hooks";

let db;

export const init = async () => {
  console.log("Init...", DATABASE_URL);
  db = await initDb(DATABASE_URL);
};

const populateLocals = async ({ event, resolve }) => {
  let { locals } = event;

  locals.db = db;

  return resolve(event);
};

export const handle = sequence(populateLocals);

export const handleError = async ({ error, event, status, message }) => {
  return {
    message: `An error occured: ${error.message}`,
  };
};
