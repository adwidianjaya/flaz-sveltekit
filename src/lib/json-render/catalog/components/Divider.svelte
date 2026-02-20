<script module>
  import { z } from "zod";

  export const spec = {
    description: "Visual divider for separating content sections.",
    tags: ["Content"],
    props: z
      .object({
        label: z.string().optional(),
        style: z.enum(["solid", "dashed", "dotted"]).optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      label: "",
      style: "solid",
      class: "",
    }),
  } = $props();
</script>

{#if props.label}
  <div
    class={[
      "divider",
      props.style === "dashed" && "before:border-dashed after:border-dashed",
      props.style === "dotted" && "before:border-dotted after:border-dotted",
      props.class,
    ]}>
    {props.label}
  </div>
{:else}
  <hr
    class={[
      "my-4 border-0 border-t",
      props.style === "solid" && "border-solid",
      props.style === "dashed" && "border-dashed",
      props.style === "dotted" && "border-dotted",
      props.class,
    ]} />
{/if}
