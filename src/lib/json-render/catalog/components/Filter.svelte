<script module>
  import { z } from "zod";

  const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
  });

  export const spec = {
    description:
      "Filter control using an HTML form with checkbox options and a reset button.",
    tags: ["Input"],
    props: z
      .object({
        label: z.string().optional(),
        name: z.string().optional(),
        disabled: z.boolean().optional(),
        values: z.array(z.string()).optional(),
        options: z.array(optionSchema).optional(),
        resetLabel: z.string().optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      label: "",
      name: "filter",
      disabled: false,
      values: [],
      options: [],
      resetLabel: "×",
      class: "",
    }),
  } = $props();

  const onToggle = (value, checked) => {
    const current = Array.isArray(props.values) ? props.values : [];
    props.values = checked
      ? Array.from(new Set([...current, value]))
      : current.filter(item => item !== value);
  };

  const onReset = () => {
    props.values = [];
  };
</script>

<div class={["pt-4", props.class]}>
  {#if props.label}
    <div class="label py-1">
      <span class="label-text">{props.label}</span>
    </div>
  {/if}
  <form class="flex flex-wrap items-center gap-2" onreset={onReset}>
    {#each props.options || [] as option}
      <input
        class="btn"
        type="checkbox"
        name={props.name || "filter"}
        aria-label={option.label}
        value={option.value}
        checked={(props.values || []).includes(option.value)}
        disabled={props.disabled}
        onchange={event => onToggle(option.value, event.currentTarget?.checked)} />
    {/each}
    <input
      class="btn btn-square"
      type="reset"
      value={props.resetLabel || "×"}
      aria-label="Reset filters"
      disabled={props.disabled} />
  </form>
</div>
