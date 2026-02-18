<script>
  import Element from "./Element.svelte";

  let { states = $bindable({}), elements = [] } = $props();
  // $inspect("...Renderer ...states", states);
</script>

{#each elements || [] as element}
  <Element {element} bind:states />
{/each}
