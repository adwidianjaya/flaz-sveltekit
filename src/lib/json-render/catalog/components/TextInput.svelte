<script module>
  import { z } from "zod";

  export const spec = {
    description:
      "Text input with optional type for single line, or textarea when multiline is true.",
    tags: ["Input"],
    props: z
      .object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        disabled: z.boolean().optional(),
        value: z.union([z.string(), z.number()]).optional(),
        type: z
          .enum([
            "text",
            "email",
            "password",
            "number",
            "tel",
            "url",
            "search",
            "date",
            "time",
            "multiline",
          ])
          .optional()
          .default("text"),
        rows: z.number().int().min(2).optional().default(2),
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
      placeholder: "",
      value: "",
      type: "text",
      rows: 2,
      class: "",
    }),
  } = $props();
</script>

<div>
  <label class="floating-label w-full">
    <span>{props.label}</span>
    {#if props.type === "multiline"}
      <textarea
        class={["textarea w-full", props.class]}
        rows={props.rows}
        disabled={props.disabled}
        bind:value={props.value}
        placeholder={props.placeholder || props.label || ""}></textarea>
    {:else}
      <input
        type={props.type || "text"}
        class={["input w-full", props.class]}
        disabled={props.disabled}
        bind:value={props.value}
        placeholder={props.placeholder || props.label || ""} />
    {/if}
  </label>
</div>
