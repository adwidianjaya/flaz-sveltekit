<script module>
  import { z } from "zod";

  export const spec = {
    description: "Star rating input.",
    tags: ["Input"],
    props: z
      .object({
        label: z.string().optional(),
        disabled: z.boolean().optional(),
        value: z.number().optional(),
        max: z.number().int().min(1).optional(),
        allowClear: z.boolean().optional(),
        maskClass: z.string().optional(),
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
      value: 0,
      max: 5,
      allowClear: true,
      maskClass: "mask-star-2 bg-orange-400",
      class: "",
    }),
  } = $props();

  const setRating = event => {
    props.value = Number(event.currentTarget?.value || 0);
  };

  let count = $derived.by(() => Math.max(1, Number(props.max) || 5));
  let items = $derived.by(() => Array.from({ length: count }, (_, index) => index + 1));
</script>

<div class={props.class}>
  {#if props.label}
    <div class="label py-1">
      <span class="label-text">{props.label}</span>
      <span class="label-text-alt">{props.value || 0}/{count}</span>
    </div>
  {/if}
  <div class="rating">
    {#if props.allowClear}
      <input
        type="radio"
        aria-label="clear rating"
        class="rating-hidden"
        checked={Number(props.value || 0) === 0}
        disabled={props.disabled}
        value="0"
        onchange={setRating} />
    {/if}
    {#each items as item}
      <input
        type="radio"
        aria-label={`Rate ${item}`}
        class={`mask ${props.maskClass || "mask-star-2 bg-orange-400"}`}
        checked={Number(props.value || 0) === item}
        disabled={props.disabled}
        value={item}
        onchange={setRating} />
    {/each}
  </div>
</div>
