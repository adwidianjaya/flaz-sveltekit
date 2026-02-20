<script>
  let { data } = $props();

  const toEditHref = pagePath => {
    const normalized = String(pagePath || "/");
    if (normalized === "/") return "/_edit/";

    const encodedPath = normalized
      .replace(/^\/+/, "")
      .split("/")
      .filter(Boolean)
      .map(segment => encodeURIComponent(segment))
      .join("/");

    return `/_edit/${encodedPath}`;
  };
</script>

<svelte:head>
  <title>Pages | Flaz</title>
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-6">
  <div class="mb-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Pages</h1>
    <a class="btn btn-sm" href="/_edit/">Open Root Editor</a>
  </div>

  {#if !data.pages.length}
    <div class="alert">
      <span>No pages found in database.</span>
    </div>
  {:else}
    <div class="overflow-x-auto rounded-box border border-base-content/10 bg-base-100">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Path</th>
            <th>Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each data.pages as page}
            <tr>
              <td>{page.name || "-"}</td>
              <td><code>{page.path || "/"}</code></td>
              <td>{page.updated_at ? new Date(page.updated_at).toLocaleString() : "-"}</td>
              <td class="text-right">
                <a class="btn btn-xs btn-primary" href={toEditHref(page.path)}>Edit</a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</main>
