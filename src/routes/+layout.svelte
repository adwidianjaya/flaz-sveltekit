<script>
  // if (import.meta.hot) {
  //   // Prevent full reload, see https://github.com/vitejs/vite/issues/5763#issuecomment-1974235806
  //   import.meta.hot.on("vite:beforeFullReload", payload => {
  //     payload.path = "(WORKAROUND).html";
  //   });
  // }

  import { dev } from "$app/environment";
  import { RenderScan } from "svelte-render-scan";

  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";

  import { Toaster } from "svelte-sonner";

  import Nprogress from "$lib/components/Nprogress.svelte";
  import PageErrorInDevelopment from "$lib/components/PageErrorInDevelopment.svelte";

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Nprogress />

{@render children()}

<Toaster position="bottom-center" richColors closeButton />
<PageErrorInDevelopment />

{#if dev}
  <RenderScan duration={500} initialEnabled={false} />
{/if}
