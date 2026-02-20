<script module>
  import { z } from "zod";

  export const spec = {
    description: "Quoted text block with optional author and source.",
    tags: ["Content"],
    props: z
      .object({
        text: z.string().optional(),
        author: z.string().optional(),
        source: z.string().optional(),
        align: z.enum(["left", "center", "right"]).optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      text: "",
      author: "",
      source: "",
      align: "left",
      class: "",
    }),
  } = $props();
</script>

<blockquote
  class={[
    "border-l-4 pl-4 py-1",
    props.align === "left" && "text-left",
    props.align === "center" && "text-center",
    props.align === "right" && "text-right",
    props.class,
  ]}>
  <p class="italic">{props.text}</p>
  {#if props.author || props.source}
    <footer class="mt-2 text-sm opacity-70">
      {#if props.author}
        <span>{props.author}</span>
      {/if}
      {#if props.author && props.source}
        <span>, </span>
      {/if}
      {#if props.source}
        <cite>{props.source}</cite>
      {/if}
    </footer>
  {/if}
</blockquote>
