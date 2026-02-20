<script module>
  import { z } from "zod";

  export const spec = {
    description: "Semantic hyperlink for content blocks.",
    tags: ["Content", "Action"],
    props: z
      .object({
        text: z.string().optional(),
        href: z.string().optional(),
        target: z.enum(["_self", "_blank"]).optional().default("_self"),
        rel: z.string().optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      text: "",
      href: "",
      target: "_self",
      rel: "",
      class: "",
    }),
  } = $props();

  const safeRel = $derived.by(() => {
    if (props.rel) return props.rel;
    return props.target === "_blank" ? "noopener noreferrer" : undefined;
  });
</script>

<a
  href={props.href || "#"}
  target={props.target}
  rel={safeRel}
  class={["link link-primary", props.class]}>{props.text || props.href}</a>
