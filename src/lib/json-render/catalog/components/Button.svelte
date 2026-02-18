<script module>
  import { z } from "zod";

  export const spec = {
    name: "Button",
    description: "Clickable button. Bind onclick to handle click events.",
    props: z
      .object({
        label: z.string().optional(),
        disabled: z.boolean().optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
    events: ["onclick"],
  };
</script>

<script>
  const {
    props = $bindable({
      label: "",
      disabled: false,
      onclick,
    }),
  } = $props();
</script>

<button
  class={["btn", props.disabled && "btn-disabled", props.class]}
  onclick={props.onclick}>{props.label}</button>
