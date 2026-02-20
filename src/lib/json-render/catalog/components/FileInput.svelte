<script module>
  import { z } from "zod";

  export const spec = {
    description: "File input. Emits selected file (or files) through props.files.",
    tags: ["Input"],
    props: z
      .object({
        label: z.string().optional(),
        disabled: z.boolean().optional(),
        multiple: z.boolean().optional(),
        accept: z.string().optional(),
        files: z.any().optional().default(null),
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
      multiple: false,
      accept: "",
      files: null,
      class: "",
    }),
  } = $props();

  const onChange = event => {
    const selected = event.currentTarget?.files;
    if (!selected) {
      props.files = props.multiple ? [] : null;
      return;
    }

    props.files = props.multiple ? Array.from(selected) : selected[0] || null;
  };

  let selectedNames = $derived.by(() => {
    if (!props.files) return "";
    if (Array.isArray(props.files)) {
      return props.files.map(file => file?.name).filter(Boolean).join(", ");
    }
    return props.files?.name || "";
  });
</script>

<div>
  <label class="floating-label w-full">
    <span>{props.label}</span>
    <input
      type="file"
      class={["file-input w-full", props.class]}
      disabled={props.disabled}
      multiple={props.multiple}
      accept={props.accept || undefined}
      onchange={onChange} />
  </label>
  {#if selectedNames}
    <div class="text-xs text-gray-400 mt-1">{selectedNames}</div>
  {/if}
</div>
