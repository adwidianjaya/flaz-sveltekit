<script module>
  import { z } from "zod";

  export const spec = {
    description: "Toggle switch input based on daisyUI toggle styles.",
    tags: ["Input"],
    props: z
      .object({
        label: z.string().optional(),
        disabled: z.boolean().optional(),
        checked: z.boolean().optional(),
        indeterminate: z.boolean().optional(),
        size: z.enum(["xs", "sm", "md", "lg", "xl"]).optional(),
        color: z
          .enum([
            "primary",
            "secondary",
            "accent",
            "neutral",
            "success",
            "warning",
            "info",
            "error",
          ])
          .optional(),
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
      indeterminate: false,
      size: "md",
      color: "",
      class: "",
    }),
  } = $props();

  let inputEl;

  $effect(() => {
    if (inputEl) {
      inputEl.indeterminate = !!props.indeterminate;
    }
  });

  let toggleClasses = $derived.by(() => [
    "toggle",
    props.size ? `toggle-${props.size}` : "",
    props.color ? `toggle-${props.color}` : "",
  ]);
</script>

<label class={["label cursor-pointer pt-4 justify-start gap-3", props.class]}>
  <input
    bind:this={inputEl}
    type="checkbox"
    class={toggleClasses}
    disabled={props.disabled}
    bind:checked={props.checked} />
  <span class="label-text">{props.label}</span>
</label>
