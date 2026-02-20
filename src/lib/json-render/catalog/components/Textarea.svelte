<script module>
  import { z } from "zod";

  export const spec = {
    description: "Multiline text input.",
    tags: ["Input"],
    props: z
      .object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        disabled: z.boolean().optional(),
        value: z.string().optional(),
        rows: z.number().int().min(2).optional(),
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
      value: "",
      rows: 3,
      class: "",
    }),
  } = $props();
</script>

<div class="pt-4">
  <label class="floating-label w-full">
    <span>{props.label}</span>
    <textarea
      class={["textarea w-full", props.class]}
      rows={props.rows || 3}
      disabled={props.disabled}
      bind:value={props.value}
      placeholder={props.placeholder || props.label || ""}></textarea>
  </label>
</div>
