<script>
  import { twMerge } from "tailwind-merge";

  const { logs = [] } = $props();
  // $inspect("...logs", logs);

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
    "h-32 flex-none border-t border-gray-700 overflow-y-scroll font-mono text-xs",
    logs.length > 0
      ? "text-gray-400 hover:text-gray-300 transition duration-100"
      : "text-gray-400",
  ]}>
  <div class="sticky top-0 z-10 bg-gray-700 px-2 py-1 mb-1">Logs</div>
  {#each logs as log}
    <div
      class={twMerge([
        "rounded-sm py-0.5 px-2 shadow",
        /* default */ "hover:bg-gray-700 hover:text-white",
        log.operation?.op === "add" &&
          "hover:bg-gray-700 hover:text-white text-gray-400",
        log.operation?.op === "remove" &&
          "hover:bg-orange-700 hover:text-white text-orange-300",
        log.operation?.op === "replace" &&
          "hover:bg-purple-700 hover:text-white text-purple-300",
        log.operation?.op === "info" &&
          "hover:bg-blue-700 hover:text-white text-blue-300 py-1 mb-2",
        log.operation?.op === "error" &&
          "hover:bg-red-700 hover:text-white text-red-300 py-1 mb-2",
      ])}>
      {log.message}
    </div>
  {:else}
    <div class="py-1 px-4">No logs yet...</div>
  {/each}
</div>
