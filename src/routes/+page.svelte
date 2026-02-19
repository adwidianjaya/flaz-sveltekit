<script>
  import logo from "$lib/assets/logo-bg.png";
  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(() => {
      window.location.href = "/_edit/";
    }, 3 * 1000);
  });
</script>

<svelte:head>
  <title>Flaz</title>
</svelte:head>

<div class="flex flex-col w-full h-dvh">
  <div class="w-full italic font-semibold py-3 px-4">
    <img
      src={logo}
      alt="Flaz Logo"
      class="h-8 w-auto inline-block rounded-lg overflow-hidden" />
    &nbsp; Flaz
  </div>

  <div class="flex flex-1 overflow-hidden flex-col justify-center items-center">
    <div class="italic text-3xl text-gray-500 animate-pulse"
      >Flaz is loading...</div>
  </div>
</div>
