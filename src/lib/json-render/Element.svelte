<script>
  import { onMount } from "svelte";
  import Element from "./Element.svelte";
  import { componentModules } from "./catalog/component-modules.svelte.js";
  import { createReactiveProps } from "./reactive-props.svelte";
  import { set } from "lodash-es";

  let { element = {}, states = $bindable({}) } = $props();
  // $inspect("...states", states);

  const Component = $derived(
    componentModules[
      `/src/lib/json-render/catalog/components/${element?.type}.svelte`
    ],
  );
  let reactiveProps = createReactiveProps(element?.props || {}, states);
  // $inspect("...reactiveProps", reactiveProps);
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
