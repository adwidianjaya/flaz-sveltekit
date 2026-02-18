<script>
  import Element from "./Element.svelte";

  const { structure } = $props();
  // $inspect("...structure", structure);
  // $inspect("...structure.states", structure.states);
</script>

{#each structure?.elements || [] as element}
  <Element {element} bind:states={structure.states} />
{/each}
