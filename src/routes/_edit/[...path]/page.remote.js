import { error, fail } from "@sveltejs/kit";
import { getRequestEvent, query, command, prerender } from "$app/server";
import { pageTable } from "$lib/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";

const DEFAULT_PAGE = {
  definition: {
    root: "",
    states: {},
    elements: {},
  },
};

const resolvePath = () => {
  const { params } = getRequestEvent();

  // console.log("...params.path", params.path);
  let path = params.path;
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  // console.log({ path });

  return path;
};

export const loadCurrentPage = prerender(async () => {
  const { locals } = getRequestEvent();
  const currentPath = resolvePath();

  let pages = await locals.db
    .select()
    .from(pageTable)
    .where(eq(pageTable.path, currentPath));
  let currentPage = pages[0] || DEFAULT_PAGE;

  // console.log("...pages", pages, currentPage);
  return {
    // pages,
    ...currentPage,
  };
});

export const loadPages = query(async () => {
  try {
    const { locals, params } = getRequestEvent();
    let pages = await locals.db.select().from(pageTable);

    if (!pages.length) {
      await locals.db.insert(pageTable).values({
        name: "Home",
        path: "/",
        definition: {
          root: "",
          states: {},
          elements: {},
        },
      });
      pages = await locals.db.select().from(pageTable);
    }

    // console.log("...pages", pages);
    return {
      pages,
    };
  } catch (err) {
    console.error(err);
    error(err.status || 500, `An error occured: ${err.message}`);
  }
});

export const saveDefinition = command(
  z
    .object({
      definition: z.json(),
    })
    .toJSONSchema(),
  async ({ definition }) => {
    try {
      const { locals } = getRequestEvent();
      const currentPath = resolvePath();

      await locals.db
        .insert(pageTable)
        .values({
          name: "",
          path: currentPath,
          definition,
        })
        .onConflictDoUpdate({
          target: [pageTable.path],
          set: {
            definition,
          },
        });

      let pages = await locals.db
        .select()
        .from(pageTable)
        .where(eq(pageTable.path, currentPath));
      let currentPage = pages[0];
      // console.log({
      //   currentPage,
      //   currentPath,
      // });

      const fileName = ("root" + currentPath.split("/").join(".") + ".json")
        .split("..")
        .join(".");
      fs.writeFileSync(
        path.join(process.cwd(), "src/data/pages", fileName),
        JSON.stringify(currentPage.definition, null, 2),
      );

      return {};
    } catch (err) {
      console.error(err);
      error(err.status || 500, `An error occured: ${err.message}`);
    }
  },
);
