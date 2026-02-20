<script module>
  import { z } from "zod";

  export const spec = {
    description: "Circular radial progress indicator.",
    tags: ["Content"],
    props: z
      .object({
        value: z.number().min(0).optional().default(0),
        max: z.number().positive().optional().default(100),
        size: z.union([z.number().positive(), z.string()]).optional(),
        thickness: z.union([z.number().positive(), z.string()]).optional(),
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
        showValue: z.boolean().optional(),
        label: z.string().optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      value: 0,
      max: 100,
      size: undefined,
      thickness: undefined,
      tone: "neutral",
      showValue: true,
      label: "",
      class: "",
    }),
  } = $props();

  const normalizedValue = $derived.by(() => {
    const value = Number(props.value || 0);
    const max = Number(props.max || 100);
    if (max <= 0) return 0;
    return Math.min(100, Math.max(0, (value / max) * 100));
  });

  const progressStyle = $derived.by(() => {
    const styles = [`--value:${normalizedValue}`];
    if (props.size !== undefined) {
      styles.push(
        `--size:${typeof props.size === "number" ? `${props.size}px` : props.size}`,
      );
    }
    if (props.thickness !== undefined) {
      styles.push(
        `--thickness:${typeof props.thickness === "number" ? `${props.thickness}px` : props.thickness}`,
      );
    }
    return styles.join(";");
  });

  const displayLabel = $derived.by(() => {
    if (props.label) return props.label;
    return `${Math.round(normalizedValue)}%`;
  });
</script>

<div
  class={[
    "radial-progress",
    props.tone === "primary" && "text-primary",
    props.tone === "secondary" && "text-secondary",
    props.tone === "accent" && "text-accent",
    props.tone === "info" && "text-info",
    props.tone === "success" && "text-success",
    props.tone === "warning" && "text-warning",
    props.tone === "error" && "text-error",
    props.class,
  ]}
  style={progressStyle}
  role="progressbar"
  aria-valuenow={props.value}
  aria-valuemin={0}
  aria-valuemax={props.max}>
  {#if props.showValue}
    {displayLabel}
  {/if}
</div>
