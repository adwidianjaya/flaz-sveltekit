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
    }),
    children,
  } = $props();
</script>

<div
  class={[
    "px-4 py-3 rounded border border-gray-600 bg-gray-700",
    props.maxWidth === "sm" && "max-w-sm",
    props.maxWidth === "md" && "max-w-md",
    props.maxWidth === "lg" && "max-w-lg",
    props.maxWidth === "xl" && "max-w-xl",
    props.maxWidth === "2xl" && "max-w-2xl",
    props.maxWidth === "3xl" && "max-w-3xl",
    props.centered && "mx-auto",
    props.class,
  ]}>
  <div class="text-lg">{props.title}</div>
  <div class="text-sm">{props.description}</div>
  {@render children?.()}
</div>
