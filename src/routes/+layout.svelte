<script>
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
