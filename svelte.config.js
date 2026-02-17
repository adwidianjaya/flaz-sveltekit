// import adapter from "@sveltejs/adapter-node";
import adapter from "svelte-adapter-bun";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // kit: { adapter: adapter() },

    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      bundler: "bun",
      precompress: true,
      bunBuildMinify: true,
    }),
    //
    // experimental: {
    //   remoteFunctions: true,
    // },
  },
};

export default config;
