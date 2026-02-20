<script module>
  import { z } from "zod";

  export const spec = {
    description: "Toggle switch for boolean values.",
    tags: ["Input"],
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

<label class={["label cursor-pointer justify-start gap-3", props.class]}>
  <input
    type="checkbox"
    class="toggle"
    disabled={props.disabled}
    bind:checked={props.checked} />
  <span class="label-text">{props.label}</span>
</label>
