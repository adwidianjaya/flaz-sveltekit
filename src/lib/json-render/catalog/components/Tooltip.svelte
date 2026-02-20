<script module>
  import { z } from "zod";

  export const spec = {
    description: "Tooltip wrapper that shows text on hover/focus.",
    tags: ["Content"],
    props: z
      .object({
        text: z.string().optional(),
        triggerText: z.string().optional(),
        position: z
          .enum(["top", "bottom", "left", "right"])
          .optional()
          .default("top"),
        align: z.enum(["center", "start", "end"]).optional().default("center"),
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
        open: z.boolean().optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      text: "",
      triggerText: "Hover me",
      position: "top",
      align: "center",
      tone: "neutral",
      open: false,
      class: "",
    }),
    children,
  } = $props();
</script>

<div
  class={[
    "tooltip",
    props.position === "top" && "tooltip-top",
    props.position === "bottom" && "tooltip-bottom",
    props.position === "left" && "tooltip-left",
    props.position === "right" && "tooltip-right",
    props.align === "start" && "tooltip-start",
    props.align === "end" && "tooltip-end",
    props.tone === "primary" && "tooltip-primary",
    props.tone === "secondary" && "tooltip-secondary",
    props.tone === "accent" && "tooltip-accent",
    props.tone === "info" && "tooltip-info",
    props.tone === "success" && "tooltip-success",
    props.tone === "warning" && "tooltip-warning",
    props.tone === "error" && "tooltip-error",
    props.open && "tooltip-open",
    props.class,
  ]}
  data-tip={props.text}>
  {#if children}
    {@render children?.()}
  {:else}
    <span class="cursor-help">{props.triggerText}</span>
  {/if}
</div>
