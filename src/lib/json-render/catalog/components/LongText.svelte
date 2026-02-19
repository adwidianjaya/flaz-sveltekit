<script module>
  import { z } from "zod";

  export const spec = {
    description: "Long text, multi line input.",
    props: z
      .object({
        label: z.string().optional(),
        disabled: z.boolean().optional(),
      })
      .toJSONSchema(),
    // events: ["onclick"],
  };
</script>

<script>
  const {
    props = $bindable({
      label: "",
      disabled: false,
      value: "",
    }),
  } = $props();
</script>

<label class="floating-label">
  <span>{props.label}</span>
  <textarea
    class="textarea"
    placeholder="Bio"
    disabled={props.disabled}
    bind:value={props.value}></textarea>
</label>
