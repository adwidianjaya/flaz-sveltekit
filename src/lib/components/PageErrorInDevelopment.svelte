<script>
  import { fade } from "svelte/transition";
  import { XIcon, MessageSquareWarningIcon } from "lucide-svelte";
  import { navigating, page } from "$app/state";

  let pageError = $state({ message: "", visible: false });
  $effect(() => {
    if (!page?.data?.error?.message) {
      return;
    }

    pageError.visible = true;
    pageError.message = page?.data?.error?.message;
  });
</script>

{#if pageError?.visible}
  <button
    transition:fade={{ duration: 200 }}
    type="button"
    onclick={() => {
      pageError.visible = false;
    }}
    class="fixed bottom-4 right-4 bg-red-500 border-l-4 border-red-700 text-white px-3 py-3 shadow-lg shadow-red-300/50 hover:bg-red-700 transition-all duration-200 group">
    <div class="relative text-left">
      <div
        class="absolute top-0 right-0 -mt-1 -mr-1 text-xs font-bold opacity-0 group-hover:opacity-100">
        <XIcon size={16} class="inline-block" />
      </div>
      <div class="text-xs font-normal pb-1">
        <MessageSquareWarningIcon size={16} class="-mt-1 inline-block" /> Error Occured
        While Loading Data:
      </div>
      <div class="text-sm font-thin">
        export const load: <span class="font-normal">
          {pageError.message}
        </span>
      </div>
    </div>
  </button>
{/if}
