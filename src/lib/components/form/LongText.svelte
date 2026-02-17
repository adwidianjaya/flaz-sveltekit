<script>
  import { onMount } from "svelte";
  import BadgeAlert from "../movingicons/BadgeAlert.svelte";
  import autosize from "svelte-autosize";

  let {
    value = $bindable(),
    label,
    note,
    placeholder,
    required,
    class: containerClass,
    autoSize = true,
    size = "medium",
    defaultValue = "",
    autofocus,
    ...props
  } = $props();

  let inputElement = $state();
  onMount(() => {
    if (autofocus) {
      inputElement.focus();
    }
  });

  $effect(() => {
    // console.log("$effect...", typeof value, { value, defaultValue });
    if (value === undefined && defaultValue) {
      // console.log("defaultValue", defaultValue);
      value = defaultValue;
    }
  });

  let touched = $state(false);
  let inputIsInvalid = $derived.by(() => required && touched && !value);

  const SIZE_CLASSES_MAP = {
    large: "w-full px-4 py-3 text-base border-2",
    medium: "w-full px-3 py-2 text-sm border-2",
    small: "w-full px-2 py-2 text-xs border",
  };
  const LABEL_CLASSES_MAP = {
    large: "text-base",
    medium: "text-sm",
    small: "text-xs",
  };

  let textareaElement = $state();
  onMount(() => {
    if (!textareaElement) return;
    autosize.update(textareaElement);
  });
</script>

<div class="pt-2 pb-2 {containerClass}">
  {#if label}
    <div
      class={[
        "pb-1 text-left",
        value ? "text-black" : "text-gray-500",
        LABEL_CLASSES_MAP[size],
        props.disabled && "opacity-50",
      ]}>
      {label}
    </div>
  {/if}

  <div class="relative">
    {#if autoSize}
      <textarea
        bind:this={textareaElement}
        use:autosize
        class={[
          SIZE_CLASSES_MAP[size],
          "rounded-sm transition duration-100 placeholder-gray-500 bg-white",
          inputIsInvalid
            ? "border-red-400 bg-red-100"
            : value
              ? "border-gray-500"
              : "border-gray-400 opacity-75",
          "focus:outline-none focus:border-primary-500",
          "focus:ring-1 focus:ring-primary-500",
          "disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-gray-200",
        ]}
        type="text"
        bind:value
        placeholder={props.disabled
          ? ""
          : placeholder || (label ? `${label}...` : "")}
        {required}
        {...props}
        onblur={() => {
          touched = true;
        }}></textarea>
    {:else}
      <textarea
        bind:this={textareaElement}
        class={[
          SIZE_CLASSES_MAP[size],
          "rounded-sm transition duration-100",
          inputIsInvalid ? "border-red-400 bg-red-100" : "border-gray-400",
          "focus:outline-none focus:border-primary-500",
          "focus:ring-1 focus:ring-primary-500",
        ]}
        type="text"
        bind:value
        placeholder={props.disabled
          ? ""
          : placeholder || (label ? `${label}...` : "")}
        {required}
        {...props}
        onblur={() => {
          touched = true;
        }}></textarea>
    {/if}
    {#if inputIsInvalid}
      <BadgeAlert
        color="red"
        class="absolute"
        style="top: 8px; right: 8px;"
        size={24} />
    {/if}
  </div>

  {#if note}
    <div class="text-gray-500 text-xs pt-1 px-1 italic text-right">
      {note || !required ? "Opsional" : ""}
    </div>
  {/if}
</div>
