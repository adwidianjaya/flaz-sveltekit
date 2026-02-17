<script module>
  import { z } from "zod";

  export const spec = {
    name: "ShortText",
    description: "Short text, single line input.",
    props: z
      .object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        disabled: z.boolean().optional(),
        value: z.string().optional(),
      })
      .toJSONSchema(),
    events: ["oninput"],
  };
</script>

<script>
  let {
    label = "",
    disabled = false,
    placeholder = "",
    value = $bindable(),
  } = $props();
</script>

<div class="pt-4">
  <label class="floating-label">
    <span>{label}</span>
    <input
      type="text"
      class="input w-full"
      {disabled}
      bind:value
      placeholder={placeholder || label || ""} />
  </label>
</div>
