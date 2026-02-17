<script>
  import { page } from "$app/state";
  // import Button from "$lib/components/form/Button.svelte";
  // import { ArrowLeftIcon } from "lucide-svelte";
</script>

<div
  class="h-screen w-screen bg-liner-to-br from-gray-50 to-red-100 flex flex-col items-center justify-center">
  <div class="flex items-center justify-center w-full text-center text-red-500">
    <div class="text-5xl">{page.status}</div>
    <div class="border-r-2 border-red-400 ml-2 mr-6 text-6xl">&nbsp;</div>
    <div class="text-xl">{page.error.message}</div>
  </div>
  <!-- <div class="text-center pt-4 -ml-2">
    <Button
      color="red"
      variant="solid"
      rounded
      onclick={e => {
        window.history.back();
      }}>
      <ArrowLeftIcon size={16} class="inline-block -mt-1" /> Kembali
    </Button>
  </div> -->
</div>
