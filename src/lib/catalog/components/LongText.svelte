<script module>
  import { z } from "zod";

  export const spec = {
    name: "ShortText",
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
  const { label = "", disabled = false, oninput } = $props();
</script>

<label class="floating-label">
  <span>{label}</span>
  <textarea class="textarea" placeholder="Bio" {disabled} {oninput}></textarea>
</label>
