import { handleRequest } from "$lib/json-render/route.js";

export async function POST({ request }) {
  return handleRequest({ request });
}
