<script>
  const { schema } = $props();
  // $inspect("...schema", schema);

  const schemaStringified = $derived(JSON.stringify(schema, null, 2));
  // $inspect("...schemaStringified", schemaStringified);
</script>

<div class="h-full overflow-y-scroll bg-stone-100">
  <div
    class="sticky top-0 left-0 z-10 px-2 py-1 mb-1 text-xs bg-gray-600 text-white">
    Schema
  </div>
  <div
    class={[
      "whitespace-pre font-mono text-xs px-2 py-1",
      "text-gray-600 hover:text-black transition duration-100",
    ]}>
    {schemaStringified}
  </div>
</div>
