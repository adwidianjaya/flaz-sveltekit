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
        width: z.union([z.number().positive(), z.string()]).optional(),
        maxWidth: z
          .enum(["sm", "md", "lg", "xl", "2xl", "3xl"])
          .optional()
          .default("md"),
        centered: z.boolean().optional(),
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
      width: undefined,
      maxWidth: "md",
      centered: false,
      layout: "stack",
      gap: "4",
      columns: "1",
      class: "",
    }),
    children,
  } = $props();
  const widthStyle =
    props.width !== undefined
      ? `width: ${typeof props.width === "number" ? `${props.width}px` : props.width};`
      : undefined;
  // $inspect("...props", props);
</script>

<div
  style={widthStyle}
  class={[
    "px-4 pt-4 pb-4 rounded border border-gray-100 bg-white shadow-sm min-w-0 overflow-hidden",
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
    <div class="text-sm">
      {props.description}
    </div>
  {/if}
  <div
    class={[
      props.layout === "stack" && "flex flex-col",
      props.layout === "grid" && "grid",
      props.layout === "grid" && props.columns === "1" && "grid-cols-1",
      props.layout === "grid" && props.columns === "2" && "grid-cols-2",
      props.layout === "grid" && props.columns === "3" && "grid-cols-3",
      props.layout === "grid" && props.columns === "4" && "grid-cols-4",
      props.gap === "0" && "gap-0 pt-0",
      props.gap === "2" && "gap-2 pt-2",
      props.gap === "4" && "gap-4 pt-4",
      props.gap === "6" && "gap-6 pt-6",
      props.gap === "8" && "gap-8 pt-8",
    ]}>
    {@render children?.()}
  </div>
</div>
