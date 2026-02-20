<script>
  import { CircleArrowRight } from "lucide-svelte";

  let { prompt = $bindable(), handleSendPrompt, loading } = $props();
</script>

<div class="h-32 flex-none border-t border-gray-300 flex flex-col bg-gray-100">
  <textarea
    placeholder="Talk to Flaz here..."
    onkeydown={e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendPrompt?.();
        return;
      }
    }}
    bind:value={prompt}
    class={[
      "w-full h-full outline-0 text-sm px-3 py-2",
      loading && "animate-pulse pointer-events-none text-gray-500",
    ]}></textarea>
  <div class="text-right flex-none bg-gray-100">
    <button
      type="button"
      onclick={handleSendPrompt}
      class={[
        "px-2 py-1 cursor-pointer",
        "text-gray-600 hover:text-gray-400",
        "transition duration-100",
      ]}>
      <CircleArrowRight class="w-6 h-6" />
    </button>
  </div>
</div>
