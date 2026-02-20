<script module>
  import { z } from "zod";

  export const spec = {
    description: "Linear progress bar for completion state.",
    tags: ["Content"],
    props: z
      .object({
        value: z.number().min(0).optional().default(0),
        max: z.number().positive().optional().default(100),
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
      tone: "neutral",
      class: "",
    }),
  } = $props();
</script>

<progress
  class={[
    "progress",
    props.tone === "primary" && "progress-primary",
    props.tone === "secondary" && "progress-secondary",
    props.tone === "accent" && "progress-accent",
    props.tone === "info" && "progress-info",
    props.tone === "success" && "progress-success",
    props.tone === "warning" && "progress-warning",
    props.tone === "error" && "progress-error",
    props.class,
  ]}
  value={props.value}
  max={props.max}>
  {props.value}
</progress>
