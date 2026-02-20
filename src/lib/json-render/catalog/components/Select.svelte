<script module>
  import { z } from "zod";

  const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
  });

  export const spec = {
    description: "Dropdown select input.",
    tags: ["Input"],
    props: z
      .object({
        label: z.string().optional(),
        disabled: z.boolean().optional(),
        value: z.string().optional(),
        placeholder: z.string().optional().default("Select one"),
        options: z.array(optionSchema).optional().default([]),
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
      placeholder: "Select one",
      options: [],
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
      bind:value={props.value}>
      {#if props.placeholder}
        <option value="" disabled>{props.placeholder}</option>
      {/if}
      {#each props.options || [] as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </label>
</div>
