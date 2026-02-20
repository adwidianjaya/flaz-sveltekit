<script module>
  import { z } from "zod";

  export const spec = {
    description: "Clickable button. Bind onclick to handle click events.",
    tags: ["Action", "Form"],
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
      class: "",
    }),
  } = $props();
</script>

<button
  class={["btn", props.disabled && "btn-disabled", props.class]}
  onclick={props.onclick}>{props.label}</button>
