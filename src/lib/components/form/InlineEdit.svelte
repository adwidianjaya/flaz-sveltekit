<script>
  import { onMount } from "svelte";

  let {
    value = $bindable(""),
    emptyLabel = "Click to edit",
    placeholder = "Enter value",
    saveText = "Save",
    cancelText = "Cancel",
    disabled = false,
    saving = false,
    onSave,
    class: className = "",
    children,
  } = $props();

  let open = $state(false);
  let draft = $state(String(value || ""));

  let rootEl = $state();
  let inputEl = $state();

  const showEditor = () => {
    if (disabled || saving) {
      return;
    }

    draft = String(value || "");
    open = true;
  };

  const closeEditor = () => {
    open = false;
    draft = String(value || "");
  };

  const save = async () => {
    if (disabled || saving) {
      return;
    }

    value = draft.trim();
    await onSave?.(value);
    open = false;
  };

  onMount(() => {
    const onPointerDown = event => {
      if (!open || !rootEl) {
        return;
      }

      if (!rootEl.contains(event.target)) {
        closeEditor();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  });

  $effect(() => {
    if (open && inputEl) {
      inputEl.focus();
      inputEl.select();
    }
  });
</script>

<!-- {@render children?.()} -->
<div class={["relative inline-block", className]} bind:this={rootEl}>
  <button
    type="button"
    class={[
      "rounded",
      "hover:bg-slate-300/60 transition-colors",
      "underline decoration-dashed cursor-pointer",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ]}
    onclick={showEditor}
    disabled={disabled || saving}>
    {#if children}
      {@render children?.()}
    {:else}
      <span class={value ? "text-slate-900" : "text-slate-500 italic"}>
        {value || emptyLabel}
      </span>
    {/if}
  </button>

  {#if open}
    <div
      class={[
        "absolute right-0 top-[calc(100%+0.375rem)] z-30",
        "flex items-center gap-2 rounded border border-slate-300 bg-white p-2 shadow-lg",
      ]}>
      <input
        bind:this={inputEl}
        class="input input-xs input-bordered w-48 px-2"
        bind:value={draft}
        {placeholder}
        disabled={saving}
        onkeydown={event => {
          if (event.key === "Enter") {
            event.preventDefault();
            save();
          }
          if (event.key === "Escape") {
            event.preventDefault();
            closeEditor();
          }
        }} />
      <button class="btn btn-xs" type="button" onclick={save} disabled={saving}>
        {saving ? "Saving..." : saveText}
      </button>
      <button
        class="btn btn-xs btn-ghost"
        type="button"
        onclick={closeEditor}
        disabled={saving}>
        {cancelText}
      </button>
    </div>
  {/if}
</div>
