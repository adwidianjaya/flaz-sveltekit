<script module>
  import { z } from "zod";

  const itemSchema = z.union([
    z.string(),
    z.object({
      label: z.string(),
      checked: z.boolean().optional(),
    }),
  ]);

  export const spec = {
    description: "List content for bullet, numbered, or checklist styles.",
    tags: ["Content"],
    props: z
      .object({
        items: z.array(itemSchema).optional().default([]),
        type: z.enum(["ul", "ol", "check"]).optional().default("ul"),
        marker: z.enum(["disc", "decimal", "none"]).optional().default("disc"),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      items: [],
      type: "ul",
      marker: "disc",
      class: "",
    }),
  } = $props();

  const normalizedItems = $derived(
    (props.items || []).map(item => {
      if (typeof item === "string") return { label: item, checked: false };
      return {
        label: item?.label || "",
        checked: Boolean(item?.checked),
      };
    }),
  );
</script>

{#if props.type === "ol"}
  <ol
    class={[
      "pl-5",
      props.marker === "none" && "list-none",
      props.marker === "disc" && "list-disc",
      (!props.marker || props.marker === "decimal") && "list-decimal",
      props.class,
    ]}>
    {#each normalizedItems as item}
      <li class="my-1">{item.label}</li>
    {/each}
  </ol>
{:else if props.type === "check"}
  <ul class={["space-y-2", props.class]}>
    {#each normalizedItems as item}
      <li class="flex items-center gap-2">
        <input type="checkbox" class="checkbox checkbox-sm" checked={item.checked} disabled />
        <span>{item.label}</span>
      </li>
    {/each}
  </ul>
{:else}
  <ul
    class={[
      "pl-5",
      props.marker === "none" && "list-none",
      props.marker === "disc" && "list-disc",
      props.marker === "decimal" && "list-decimal",
      props.class,
    ]}>
    {#each normalizedItems as item}
      <li class="my-1">{item.label}</li>
    {/each}
  </ul>
{/if}
