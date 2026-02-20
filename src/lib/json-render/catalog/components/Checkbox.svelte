<script module>
  import { z } from "zod";

  const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
  });

  export const spec = {
    description:
      "Checkbox input for boolean values or grouped options for multiple selected values.",
    tags: ["Input"],
    props: z
      .object({
        label: z.string().optional(),
        disabled: z.boolean().optional(),
        checked: z.boolean().optional(),
        values: z.array(z.string()).optional(),
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
      checked: false,
      values: [],
      options: [],
      direction: "column",
      class: "",
    }),
  } = $props();
</script>

{#if (props.options || []).length > 0}
  <div class={["pt-4", props.class]}>
    {#if props.label}
      <div class="label py-1"
        ><span class="label-text">{props.label}</span></div>
    {/if}
    <div
      class={[
        "flex gap-3",
        props.direction === "row" ? "flex-row" : "flex-col",
      ]}>
      {#each props.options || [] as option}
        <label class="label cursor-pointer justify-start items-center gap-3">
          <input
            type="checkbox"
            class="checkbox"
            disabled={props.disabled}
            value={option.value}
            bind:group={props.values} />
          <span class="label-text">{option.label}</span>
        </label>
      {/each}
    </div>
  </div>
{:else}
  <label
    class={[
      "label cursor-pointer pt-4 justify-start items-center gap-3",
      props.class,
    ]}>
    <input
      type="checkbox"
      class="checkbox"
      disabled={props.disabled}
      bind:checked={props.checked} />
    <span class="label-text">{props.label}</span>
  </label>
{/if}
