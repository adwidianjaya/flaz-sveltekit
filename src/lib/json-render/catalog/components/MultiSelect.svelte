<script module>
  import { z } from "zod";

  const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
  });

  export const spec = {
    description: "Dropdown multi select input.",
    tags: ["Input"],
    props: z
      .object({
        label: z.string().optional(),
        disabled: z.boolean().optional(),
        values: z.array(z.string()).optional().default([]),
        options: z.array(optionSchema).optional().default([]),
        size: z.number().int().min(2).optional().default(4),
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
      values: [],
      options: [],
      size: 4,
      class: "",
    }),
  } = $props();
</script>

<div>
  <label class="floating-label w-full">
    <span>{props.label}</span>
    <select
      class={["select w-full", props.class]}
      disabled={props.disabled}
      size={props.size || 4}
      multiple
      bind:value={props.values}>
      {#each props.options || [] as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </label>
</div>
