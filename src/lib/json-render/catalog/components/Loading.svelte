<script module>
  import { z } from "zod";

  export const spec = {
    description: "Loading indicator with DaisyUI animation styles.",
    tags: ["Content"],
    props: z
      .object({
        type: z
          .enum(["spinner", "dots", "ring", "ball", "bars", "infinity"])
          .optional()
          .default("spinner"),
        size: z.enum(["xs", "sm", "md", "lg", "xl"]).optional().default("md"),
        tone: z
          .enum([
            "neutral",
            "primary",
            "secondary",
            "accent",
            "info",
            "success",
            "warning",
            "error",
          ])
          .optional()
          .default("neutral"),
        label: z.string().optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      type: "spinner",
      size: "md",
      tone: "neutral",
      label: "Loading",
      class: "",
    }),
  } = $props();
</script>

<span
  class={[
    "loading",
    props.type === "spinner" && "loading-spinner",
    props.type === "dots" && "loading-dots",
    props.type === "ring" && "loading-ring",
    props.type === "ball" && "loading-ball",
    props.type === "bars" && "loading-bars",
    props.type === "infinity" && "loading-infinity",
    props.size === "xs" && "loading-xs",
    props.size === "sm" && "loading-sm",
    props.size === "md" && "loading-md",
    props.size === "lg" && "loading-lg",
    props.size === "xl" && "loading-xl",
    props.tone === "primary" && "text-primary",
    props.tone === "secondary" && "text-secondary",
    props.tone === "accent" && "text-accent",
    props.tone === "info" && "text-info",
    props.tone === "success" && "text-success",
    props.tone === "warning" && "text-warning",
    props.tone === "error" && "text-error",
    props.class,
  ]}
  aria-label={props.label}
  role="status"></span>
