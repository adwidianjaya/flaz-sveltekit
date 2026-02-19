// import adapter from "@sveltejs/adapter-node";
import adapter from "svelte-adapter-bun";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // kit: { adapter: adapter() },

    adapter: adapter({
      bundler: "bun",
      precompress: true,
      bunBuildMinify: true,
    }),
    //
    experimental: {
      remoteFunctions: true,
    },
  },

  compilerOptions: {
    experimental: {
      async: true,
    },
  },
};

export default config;
