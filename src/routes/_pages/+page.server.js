import { pageTable } from "$lib/db/schema";

export const load = async ({ locals }) => {
  const pages = await locals.db
    .select()
    .from(pageTable)
    .orderBy(pageTable.path);

  return {
    pages,
  };
};
