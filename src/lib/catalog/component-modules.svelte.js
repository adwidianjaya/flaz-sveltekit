export const componentModules = import.meta.glob(
  ["$lib/catalog/components/**/*.svelte"],
  { eager: true, import: "default" },
);
