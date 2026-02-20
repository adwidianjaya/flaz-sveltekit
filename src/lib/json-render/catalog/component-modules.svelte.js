export const componentModules = import.meta.glob(
  ["$lib/json-render/catalog/components/**/*.svelte"],
  { eager: true, import: "default" },
);

export const componentSpecs = import.meta.glob(
  ["$lib/json-render/catalog/components/**/*.svelte"],
  { eager: true, import: "spec" },
);
