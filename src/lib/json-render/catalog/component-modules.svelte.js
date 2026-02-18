export const componentModules = import.meta.glob(
  ["$lib/json-render/catalog/components/**/*.svelte"],
  { eager: true, import: "default" },
);
