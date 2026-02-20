<script>
  import Element from "./Element.svelte";
  import {
    componentModules,
    componentSpecs,
  } from "./catalog/component-modules.svelte.js";
  import { createReactiveProps } from "./reactive-props.svelte";

  let { element = {}, states = $bindable({}) } = $props();
  // $inspect("...states", states);

  const componentPath = $derived(
    `/src/lib/json-render/catalog/components/${element?.type}.svelte`,
  );
  const Component = $derived(componentModules[componentPath]);
  const componentSpec = $derived(componentSpecs[componentPath]);
  let reactiveProps = $derived.by(() =>
    createReactiveProps(
      element?.props || {},
      states,
      componentSpec?.props || {},
    ),
  );
</script>

{#snippet renderChildren()}
  {#each element?.children || [] as child}
    <Element element={child} bind:states />
  {/each}
{/snippet}

{#if Component}
  <Component
    bind:props={reactiveProps}
    children={element?.children?.length ? renderChildren : undefined} />
{/if}
