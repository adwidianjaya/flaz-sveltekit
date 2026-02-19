<script module>
  import { z } from "zod";

  export const spec = {
    description: "Short text, single line input.",
    props: z
      .object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        disabled: z.boolean().optional(),
        value: z.string().optional(),
      })
      .toJSONSchema(),
    // events: ["oninput"],
  };
</script>

<script>
  const {
    props = $bindable({
      label: "",
      disabled: false,
      placeholder: "",
      value: "",
    }),
  } = $props();
</script>

<div class="pt-4">
  <label class="floating-label">
    <span>{props.label}</span>
    <input
      type="text"
      class="input w-full"
      disabled={props.disabled}
      bind:value={props.value}
      placeholder={props.placeholder || props.label || ""} />
  </label>
</div>
