<script module>
  import { z } from "zod";

  export const spec = {
    name: "Container",
    description: "Flex container for layouts.",
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
  const { direction = "row", gap, align, justify, ...props } = $props();
</script>

<div
  class={[
    "flex",
    direction === "row" && "flex-row",
    direction === "column" && "flex-col",
    gap === "0" && `gap-0`,
    gap === "2" && `gap-2`,
    gap === "4" && `gap-4`,
    gap === "6" && `gap-6`,
    align === "start" && `items-start`,
    align === "center" && `items-center`,
    align === "end" && `items-end`,
    align === "stretch" && `items-stretch`,
    justify === "start" && `justify-start`,
    justify === "center" && `justify-center`,
    justify === "end" && `justify-end`,
    justify === "between" && `justify-between`,
    justify === "around" && `justify-around`,
    justify === "eventy" && `justify-evenly`,
    justify === "stretch" && `justify-stretch`,
    justify === "normal" && `justify-normal`,
    props.class,
  ]}>{@render children?.()}</div>
