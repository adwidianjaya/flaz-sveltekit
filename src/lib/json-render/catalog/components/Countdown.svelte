<script module>
  import { z } from "zod";

  export const spec = {
    description:
      "Animated countdown number using DaisyUI countdown CSS variables.",
    tags: ["Content"],
    props: z
      .object({
        value: z.number().min(0).max(999).optional().default(0),
        digits: z.enum(["auto", "2", "3"]).optional().default("auto"),
        live: z.boolean().optional(),
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
      digits: "auto",
      live: true,
      label: "",
      class: "",
    }),
  } = $props();

  const normalizedValue = $derived.by(() => {
    const value = Number(props.value || 0);
    if (!Number.isFinite(value)) return 0;
    return Math.min(999, Math.max(0, Math.round(value)));
  });

  const valueStyle = $derived.by(() => {
    const styles = [`--value:${normalizedValue}`];
    if (props.digits === "2" || props.digits === "3") {
      styles.push(`--digits:${props.digits}`);
    }
    return styles.join(";");
  });

  const ariaLabel = $derived.by(() => props.label || String(normalizedValue));
</script>

<span class={["countdown", props.class]}>
  <span
    style={valueStyle}
    aria-live={props.live ? "polite" : "off"}
    aria-label={ariaLabel}>{normalizedValue}</span>
</span>
