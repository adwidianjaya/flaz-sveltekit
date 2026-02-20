<script module>
  import { z } from "zod";

  const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
  });

  export const spec = {
    description: "Single radio input option or grouped radio options.",
    tags: ["Input"],
    props: z
      .object({
        label: z.string().optional(),
        name: z.string().optional().default("radio"),
        disabled: z.boolean().optional(),
        checked: z.boolean().optional(),
        value: z.string().optional().default("option"),
        options: z.array(optionSchema).optional().default([]),
        direction: z.enum(["column", "row"]).optional().default("column"),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      label: "",
      name: "radio",
      disabled: false,
      checked: false,
      value: "option",
      options: [],
      direction: "column",
      class: "",
    }),
  } = $props();

  let selectedValue = $state(props.value);

  $effect(() => {
    if (props.value !== undefined && props.value !== selectedValue) {
      selectedValue = props.value;
    }
  });

  const onOptionChange = value => {
    selectedValue = value;
    props.value = value;
    props.checked = true;
  };

  const onChange = event => {
    const checked = !!event.currentTarget?.checked;
    props.checked = checked;
    if (checked) {
      const value = event.currentTarget?.value;
      selectedValue = value;
      props.value = value;
    }
  };
</script>

{#if (props.options || []).length > 0}
  <div class={props.class}>
    {#if props.label}
      <div class="label py-1"
        ><span class="label-text">{props.label}</span></div>
    {/if}
    <div
      class={[
        "flex gap-3",
        props.direction === "row" && "flex-row",
        (!props.direction || props.direction === "column") && "flex-col",
      ]}>
      {#each props.options || [] as option}
        <label class="label cursor-pointer justify-start gap-3">
          <input
            type="radio"
            class="radio"
            disabled={props.disabled}
            value={option.value}
            checked={selectedValue === option.value}
            onchange={() => onOptionChange(option.value)} />
          <span class="label-text">{option.label}</span>
        </label>
      {/each}
    </div>
  </div>
{:else}
  <label class={["label cursor-pointer justify-start gap-3", props.class]}>
    <input
      type="radio"
      class="radio"
      name={props.name || "radio"}
      disabled={props.disabled}
      value={props.value}
      checked={props.checked}
      onchange={onChange} />
    <span class="label-text">{props.label}</span>
  </label>
{/if}
