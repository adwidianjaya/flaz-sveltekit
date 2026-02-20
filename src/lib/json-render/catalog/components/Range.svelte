<script module>
  import { z } from "zod";

  export const spec = {
    description: "Range slider input with min/max/step support.",
    tags: ["Input"],
    props: z
      .object({
        label: z.string().optional(),
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
      disabled: false,
      value: 50,
      min: 0,
      max: 100,
      step: 1,
      class: "",
    }),
  } = $props();
</script>

<div class={props.class}>
  {#if props.label}
    <div class="label py-1">
      <span class="label-text">{props.label}</span>
      <span class="label-text-alt">{props.value}</span>
    </div>
  {/if}
  <input
    type="range"
    class="range w-full"
    disabled={props.disabled}
    min={props.min}
    max={props.max}
    step={props.step}
    bind:value={props.value} />
  <div class="w-full flex justify-between text-xs px-1 mt-1">
    <span>{props.min}</span>
    <span>{props.max}</span>
  </div>
</div>
