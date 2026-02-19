<script module>
  import { z } from "zod";

  const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
  });

  export const spec = {
    description: "Group of radio options for a single selected value.",
    tags: ["Form"],
    props: z
      .object({
        label: z.string().optional(),
        disabled: z.boolean().optional(),
        value: z.string().optional(),
        options: z.array(optionSchema).optional(),
        direction: z.enum(["column", "row"]).optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      label: "",
      disabled: false,
      value: "",
      options: [],
      direction: "column",
      class: "",
    }),
  } = $props();
</script>

<div class={["pt-4", props.class]}>
  {#if props.label}
    <div class="label py-1"><span class="label-text">{props.label}</span></div>
  {/if}
  <div class={["flex gap-3", props.direction === "row" ? "flex-row" : "flex-col"]}>
    {#each props.options || [] as option}
      <label class="label cursor-pointer justify-start gap-3">
        <input
          type="radio"
          class="radio"
          disabled={props.disabled}
          value={option.value}
          bind:group={props.value} />
        <span class="label-text">{option.label}</span>
      </label>
    {/each}
  </div>
</div>
