<script module>
  import { z } from "zod";

  export const spec = {
    description: "Container for flex or grid layouts.",
    tags: ["Layout"],
    props: z
      .object({
        layout: z.enum(["flex", "grid"]).optional().default("flex"),
        direction: z
          .enum(["row", "row-reverse", "column", "col-reverse"])
          .optional()
          .default("row"),
        columns: z.enum(["1", "2", "3", "4", "5", "6"]).optional().default("1"),
        gap: z.enum(["0", "2", "4", "6"]).optional().default("0"),
        align: z
          .enum(["start", "center", "end", "stretch"])
          .optional()
          .default("stretch"),
        justify: z
          .enum([
            "start",
            "center",
            "end",
            "between",
            "around",
            "evenly",
            "stretch",
            "normal",
          ])
          .optional()
          .default("stretch"),
        class: z.string().optional(),
      })
      .toJSONSchema(),
    // events: ["onclick"],
  };
</script>

<script>
  const {
    props = $bindable({
      layout: "flex",
      direction: "row",
      columns: "1",
      gap: "0",
      align: "stretch",
      justify: "stretch",
      class: "",
    }),
    children,
  } = $props();
</script>

<div
  class={[
    props.layout === "flex" && "flex",
    props.layout === "grid" && "grid",
    props.layout === "flex" && props.direction === "row" && "flex-row",
    props.layout === "flex" && props.direction === "row-reverse" && "flex-row-reverse",
    props.layout === "flex" && props.direction === "column" && "flex-col",
    props.layout === "flex" && props.direction === "col-reverse" && "flex-col-reverse",
    props.layout === "grid" && props.columns === "1" && "grid-cols-1",
    props.layout === "grid" && props.columns === "2" && "grid-cols-2",
    props.layout === "grid" && props.columns === "3" && "grid-cols-3",
    props.layout === "grid" && props.columns === "4" && "grid-cols-4",
    props.layout === "grid" && props.columns === "5" && "grid-cols-5",
    props.layout === "grid" && props.columns === "6" && "grid-cols-6",
    props.gap === "0" && `gap-0`,
    props.gap === "2" && `gap-2`,
    props.gap === "4" && `gap-4`,
    props.gap === "6" && `gap-6`,
    props.align === "start" && `items-start`,
    props.align === "center" && `items-center`,
    props.align === "end" && `items-end`,
    props.align === "stretch" && `items-stretch`,
    props.justify === "start" && `justify-start`,
    props.justify === "center" && `justify-center`,
    props.justify === "end" && `justify-end`,
    props.justify === "between" && `justify-between`,
    props.justify === "around" && `justify-around`,
    props.justify === "evenly" && `justify-evenly`,
    props.justify === "stretch" && `justify-stretch`,
    props.justify === "normal" && `justify-normal`,
    props.class,
  ]}>{@render children?.()}</div>
