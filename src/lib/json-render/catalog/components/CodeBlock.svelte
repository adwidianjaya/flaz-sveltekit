<script module>
  import { z } from "zod";

  export const spec = {
    description: "Code snippet block with optional line numbers.",
    tags: ["Content"],
    props: z
      .object({
        code: z.string().optional(),
        language: z.string().optional(),
        showLineNumbers: z.boolean().optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      code: "",
      language: "",
      showLineNumbers: false,
      class: "",
    }),
  } = $props();

  const lines = $derived(String(props.code || "").split("\n"));
</script>

<div class={["rounded border overflow-hidden", props.class]}>
  {#if props.language}
    <div class="px-3 py-1 text-xs uppercase tracking-wide opacity-70">{props.language}</div>
  {/if}
  {#if props.showLineNumbers}
    <pre class="m-0 p-3 overflow-x-auto"><code>
{#each lines as line, index}
<span class="inline-block w-8 pr-2 text-right opacity-60">{index + 1}</span>{line}
{/each}
</code></pre>
  {:else}
    <pre class="m-0 p-3 overflow-x-auto"><code>{props.code}</code></pre>
  {/if}
</div>
