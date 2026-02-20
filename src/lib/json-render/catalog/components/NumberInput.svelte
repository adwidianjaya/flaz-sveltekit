<script module>
  import { z } from "zod";

  export const spec = {
    description: "Number input with min/max/step support.",
    tags: ["Input"],
    props: z
      .object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        disabled: z.boolean().optional(),
        value: z.number().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
        step: z.number().optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      label: "",
      placeholder: "",
      disabled: false,
      value: undefined,
      min: undefined,
      max: undefined,
      step: 1,
      class: "",
    }),
  } = $props();
</script>

<div class="pt-4">
  <label class="floating-label w-full">
    <span>{props.label}</span>
    <input
      type="number"
      class={["input w-full", props.class]}
      disabled={props.disabled}
      min={props.min}
      max={props.max}
      step={props.step}
      bind:value={props.value}
      placeholder={props.placeholder || props.label || ""} />
  </label>
</div>
