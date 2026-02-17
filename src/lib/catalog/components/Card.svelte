<script module>
  import { z } from "zod";

  export const spec = {
    name: "Card",
    description:
      "Card component, used to group other components inside its children.",
    props: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        maxWidth: z.enum(["sm", "md", "lg", "xl", "2xl", "3xl"]).optional(),
        centered: z.boolean().optional().default(false),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    title = "",
    description = "",
    maxWidth,
    centered = false,
    children,
    ...props
  } = $props();
</script>

<div
  class={[
    "px-4 py-3 rounded border border-gray-600",
    maxWidth === "sm" && "max-w-sm",
    maxWidth === "md" && "max-w-md",
    maxWidth === "lg" && "max-w-lg",
    maxWidth === "xl" && "max-w-xl",
    maxWidth === "2xl" && "max-w-2xl",
    maxWidth === "3xl" && "max-w-3xl",
    centered && "mx-auto",
    props.class,
  ]}>
  <div class="text-lg">{title}</div>
  <div class="text-sm">{description}</div>
  {@render children?.()}
</div>
