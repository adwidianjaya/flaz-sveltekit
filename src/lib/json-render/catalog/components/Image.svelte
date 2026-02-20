<script module>
  import { z } from "zod";

  export const spec = {
    description: "Image content with optional caption and size settings.",
    tags: ["Content"],
    props: z
      .object({
        src: z.string().optional(),
        alt: z.string().optional(),
        caption: z.string().optional(),
        width: z.number().int().positive().optional(),
        height: z.number().int().positive().optional(),
        fit: z.enum(["contain", "cover", "fill", "none", "scale-down"]).optional(),
        rounded: z.boolean().optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      src: "",
      alt: "",
      caption: "",
      width: undefined,
      height: undefined,
      fit: "cover",
      rounded: false,
      class: "",
    }),
  } = $props();
</script>

<figure class={["space-y-2", props.class]}>
  <img
    src={props.src}
    alt={props.alt || ""}
    width={props.width}
    height={props.height}
    class={[
      "w-full",
      props.fit === "contain" && "object-contain",
      props.fit === "cover" && "object-cover",
      props.fit === "fill" && "object-fill",
      props.fit === "none" && "object-none",
      props.fit === "scale-down" && "object-scale-down",
      props.rounded && "rounded-lg",
    ]} />
  {#if props.caption}
    <figcaption class="text-sm opacity-70">{props.caption}</figcaption>
  {/if}
</figure>
