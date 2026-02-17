<script>
  import Element from "./Element.svelte";

  const { structure } = $props();
  // $inspect("...structure", structure);

  let pageStates = $derived(structure.states || {});
</script>

{#each structure?.elements || [] as element}
  <Element {element} bind:pageStates />
{/each}
