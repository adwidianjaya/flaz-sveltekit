<script module>
  import { z } from "zod";

  export const spec = {
    description: "Flex container for layouts.",
    tags: ["Layout"],
    props: z
      .object({
        direction: z.enum(["row", "column"]),
        gap: z.enum(["0", "2", "4", "6"]).optional(),
        align: z.enum(["start", "center", "end", "stretch"]).optional(),
        justify: z
          .enum([
            "start",
            "center",
            "end",
            "between",
            "around",
            "eventy",
            "stretch",
            "normal",
          ])
          .optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
    // events: ["onclick"],
  };
</script>

<script>
  const {
    props = $bindable({
      direction: "row",
      gap: "0",
      align: "start",
      justify: "start",
    }),
    children,
  } = $props();
</script>

<div
  class={[
    "flex",
    props.direction === "row" && "flex-row",
    props.direction === "column" && "flex-col",
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
    props.justify === "eventy" && `justify-evenly`,
    props.justify === "stretch" && `justify-stretch`,
    props.justify === "normal" && `justify-normal`,
    props.class,
  ]}>{@render children?.()}</div>
