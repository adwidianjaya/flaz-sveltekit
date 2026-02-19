<script>
  const { schema } = $props();
  // $inspect("...schema", schema);

  const schemaStringified = $derived(JSON.stringify(schema, null, 2));
  // $inspect("...schemaStringified", schemaStringified);
</script>

<div class="h-full overflow-y-scroll">
  <div
    class="sticky top-0 z-10 bg-gray-700 px-2 py-1 mb-1 text-xs text-gray-400">
    Schema
  </div>
  <div
    class={[
      "whitespace-pre font-mono text-xs px-2 py-1",
      "text-gray-400 hover:text-gray-300 transition duration-100",
    ]}>
    {schemaStringified}
  </div>
</div>
