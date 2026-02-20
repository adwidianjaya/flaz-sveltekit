<script module>
  import { z } from "zod";

  export const spec = {
    description: "Plain text, with level such as heading or paragraph.",
    tags: ["Content"],
    props: z
      .object({
        text: z.string().optional(),
        level: z.enum(["h1", "h2", "h3", "h4", "h5", "h6", "p"]).optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      text: "",
      level: "",
    }),
  } = $props();
</script>

<svelte:element
  this={props.level || "p"}
  class={[
    "mt-2",
    props.level === "h1" && "text-3xl",
    props.level === "h2" && "text-2xl",
    props.level === "h3" && "text-xl",
    props.level === "h4" && "text-lg",
    props.level === "h5" && "text-base",
    props.level === "h6" && "text-sm",
    props.level === "p" && "text-sm",
    props.class,
  ]}>{props.text}</svelte:element>
