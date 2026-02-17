<script>
  import { componentModules } from "./component-modules.svelte.js";
  // console.log({ componentModules });

  import Element from "./Element.svelte";

  let { element = {}, pageStates = $bindable({}) } = $props();
  // $inspect("...element", element);

  const Component = $derived(
    componentModules[`/src/lib/catalog/components/${element?.type}.svelte`],
  );
  // $inspect("...Component", Component);
  const props = $derived(element?.props || {});
  // $inspect("...props", props);
</script>

{#snippet renderChildren()}
  {#each element?.children || [] as child}
    <Element element={child} bind:pageStates />
  {/each}
{/snippet}

{#if Component}
  <Component
    {...props}
    bind:pageStates
    children={element?.children?.length ? renderChildren : undefined} />
{/if}
