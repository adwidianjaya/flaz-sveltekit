<script module>
  import { z } from "zod";

  export const spec = {
    description: "Skeleton placeholder block for loading layouts.",
    tags: ["Content", "Layout"],
    props: z
      .object({
        width: z.union([z.number().positive(), z.string()]).optional(),
        height: z.union([z.number().positive(), z.string()]).optional(),
        shape: z.enum(["rounded", "square", "circle"]).optional().default("rounded"),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      width: "100%",
      height: "1rem",
      shape: "rounded",
      class: "",
    }),
  } = $props();

  const boxStyle = $derived.by(() => {
    const styles = [];
    if (props.width !== undefined) {
      styles.push(
        `width:${typeof props.width === "number" ? `${props.width}px` : props.width}`,
      );
    }
    if (props.height !== undefined) {
      styles.push(
        `height:${typeof props.height === "number" ? `${props.height}px` : props.height}`,
      );
    }
    return styles.join(";");
  });
</script>

<div
  class={[
    "skeleton",
    props.shape === "square" && "rounded-none",
    props.shape === "circle" && "rounded-full",
    props.class,
  ]}
  style={boxStyle}></div>
