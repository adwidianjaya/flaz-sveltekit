<script module>
  import { z } from "zod";

  export const spec = {
    description: "Checkbox input for boolean values.",
    tags: ["Form"],
    props: z
      .object({
        label: z.string().optional(),
        disabled: z.boolean().optional(),
        checked: z.boolean().optional(),
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
      checked: false,
      class: "",
    }),
  } = $props();
</script>

<label class={["label cursor-pointer pt-4 justify-start gap-3", props.class]}>
  <input
    type="checkbox"
    class="checkbox"
    disabled={props.disabled}
    bind:checked={props.checked} />
  <span class="label-text">{props.label}</span>
</label>
