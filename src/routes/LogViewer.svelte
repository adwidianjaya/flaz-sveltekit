<script>
  const { logs = [] } = $props();

  let logOutput = $state(null);
  $effect(() => {
    if (!logs.length) {
      return;
    }

    setTimeout(() => {
      logOutput.scrollTo({
        top: logOutput.scrollHeight, // Scrolls to the maximum height of the content
        behavior: "smooth", // Enables smooth scrolling animation
      });
    }, 500);
  });
</script>

<div
  bind:this={logOutput}
  class={[
    "h-32 flex-none border-t border-gray-700 px-3 py-2 overflow-y-scroll font-mono text-xs",
    logs.length > 0
      ? "text-gray-400 hover:text-gray-300 transition duration-100"
      : "text-gray-400",
  ]}>
  {#each logs as logMessage}
    <div
      class="hover:bg-gray-700 hover:text-white rounded-sm py-0.5 px-1 -mx-1 shadow">
      {logMessage}
    </div>
  {:else}
    <div class="py-0.5 px-1 -mx-1">No logs yet...</div>
  {/each}
</div>
