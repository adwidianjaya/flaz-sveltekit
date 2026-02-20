<script module>
  import { z } from "zod";

  export const spec = {
    description:
      "Card component, used to group other components inside its children.",
    tags: ["Layout", "Content"],
    props: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        maxWidth: z.enum(["sm", "md", "lg", "xl", "2xl", "3xl"]).optional(),
        centered: z.boolean().optional().default(false),
        layout: z.enum(["stack", "grid"]).optional().default("stack"),
        gap: z.enum(["0", "2", "4", "6", "8"]).optional().default("4"),
        columns: z.enum(["1", "2", "3", "4"]).optional().default("1"),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      title: "",
      description: "",
      maxWidth: "md",
      centered: false,
      layout: "stack",
      gap: "4",
      columns: "1",
    }),
    children,
  } = $props();
  // $inspect("...props", props);
</script>

<div
  class={[
    "px-4 pt-4 pb-4 rounded border border-gray-600 bg-gray-700",
    props.maxWidth === "sm" && "max-w-sm",
    props.maxWidth === "md" && "max-w-md",
    props.maxWidth === "lg" && "max-w-lg",
    props.maxWidth === "xl" && "max-w-xl",
    props.maxWidth === "2xl" && "max-w-2xl",
    props.maxWidth === "3xl" && "max-w-3xl",
    props.centered && "mx-auto",
    props.class,
  ]}>
  {#if props.title}
    <div class="text-lg pt-1">{props.title}</div>
  {/if}
  {#if props.description}
    <div
      class={[
        "text-sm text-gray-200",
        props.gap === "0" && "pb-0",
        props.gap === "2" && "pb-2",
        props.gap === "4" && "pb-4",
        props.gap === "6" && "pb-6",
        props.gap === "8" && "pb-8",
      ]}>{props.description}</div>
  {/if}
  <div
    class={[
      props.layout === "stack" && "flex flex-col",
      props.layout === "grid" && "grid",
      props.layout === "grid" && props.columns === "1" && "grid-cols-1",
      props.layout === "grid" && props.columns === "2" && "grid-cols-2",
      props.layout === "grid" && props.columns === "3" && "grid-cols-3",
      props.layout === "grid" && props.columns === "4" && "grid-cols-4",
      props.gap === "0" && "gap-0",
      props.gap === "2" && "gap-2",
      props.gap === "4" && "gap-4",
      props.gap === "6" && "gap-6",
      props.gap === "8" && "gap-8",
    ]}>
    {@render children?.()}
  </div>
</div>
