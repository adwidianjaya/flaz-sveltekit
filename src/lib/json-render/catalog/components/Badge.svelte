<script module>
  import { z } from "zod";

  export const spec = {
    description: "Inline badge or tag for short labeled content.",
    tags: ["Content"],
    props: z
      .object({
        text: z.string().optional(),
        tone: z
          .enum(["neutral", "info", "success", "warning", "error"])
          .optional()
          .default("neutral"),
        size: z.enum(["xs", "sm", "md", "lg"]).optional().default("md"),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      text: "",
      tone: "neutral",
      size: "md",
      class: "",
    }),
  } = $props();
</script>

<span
  class={[
    "badge",
    props.tone === "neutral" && "badge-neutral",
    props.tone === "info" && "badge-info",
    props.tone === "success" && "badge-success",
    props.tone === "warning" && "badge-warning",
    props.tone === "error" && "badge-error",
    props.size === "xs" && "badge-xs",
    props.size === "sm" && "badge-sm",
    props.size === "md" && "badge-md",
    props.size === "lg" && "badge-lg",
    props.class,
  ]}>{props.text}</span>
