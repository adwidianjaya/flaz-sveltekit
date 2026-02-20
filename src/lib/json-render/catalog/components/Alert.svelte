<script module>
  import { z } from "zod";

  export const spec = {
    description: "Alert message container for status and feedback content.",
    tags: ["Content"],
    props: z
      .object({
        text: z.string().optional(),
        tone: z
          .enum(["neutral", "info", "success", "warning", "error"])
          .optional()
          .default("neutral"),
        style: z.enum(["solid", "soft", "outline", "dash"]).optional().default("solid"),
        direction: z.enum(["horizontal", "vertical"]).optional().default("horizontal"),
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
      style: "solid",
      direction: "horizontal",
      class: "",
    }),
    children,
  } = $props();
</script>

<div
  role="alert"
  class={[
    "alert",
    props.tone === "info" && "alert-info",
    props.tone === "success" && "alert-success",
    props.tone === "warning" && "alert-warning",
    props.tone === "error" && "alert-error",
    props.style === "soft" && "alert-soft",
    props.style === "outline" && "alert-outline",
    props.style === "dash" && "alert-dash",
    props.direction === "horizontal" && "alert-horizontal",
    props.direction === "vertical" && "alert-vertical",
    props.class,
  ]}>
  {@render children?.()}
  {#if props.text}
    <span>{props.text}</span>
  {/if}
</div>
