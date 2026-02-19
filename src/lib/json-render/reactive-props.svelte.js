import { set, get, isString, isArray, isObject } from "lodash-es";
import { SimpleTemplatingEngine } from "./template-engine.js";

export function createReactiveProps(
  elementProps,
  states,
  options = {
    forceReloadBindingPath: process.env.NODE_ENV !== "production",
  },
) {
  const reactiveProps = {};

  // Cache binding paths to avoid re-calculating regex matches on every effect run.
  const bindingPaths = new Map();

  for (const reactiveKey in elementProps) {
    // 1. Determine and cache the binding path if it's a string binding.
    let bindingPath = bindingPaths.get(reactiveKey);
    if (
      typeof elementProps[reactiveKey] === "string" &&
      elementProps[reactiveKey].startsWith("{$states.") &&
      elementProps[reactiveKey].endsWith("}") &&
      (!bindingPath || options?.forceReloadBindingPath)
    ) {
      const match = elementProps[reactiveKey].match(/\{\$states\.([^\s?}]*)/);
      const result = match[1];
      // console.log({ result });
      bindingPath = result;
      bindingPaths.set(reactiveKey, bindingPath); // Cache the binding path

      // bindingPath = elementProps[reactiveKey].split("$states.").join("");
      // // console.log({ propsValue: elementProps[reactiveKey], bindingPath });
      // bindingPaths.set(reactiveKey, bindingPath); // Cache the binding path
    }

    // console.log("...reactiveKey", reactiveKey, bindingPath);
    Object.defineProperty(reactiveProps, reactiveKey, {
      get: function () {
        // Compute the current value for the reactive property.
        let newValue;

        let propValue = elementProps[reactiveKey] ?? "";
        if (isString(propValue)) {
          try {
            newValue = SimpleTemplatingEngine.render(propValue, states || {});
          } catch (error) {
            console.warn(
              `Error handling template for key '${reactiveKey}':`,
              error,
            );
            newValue = propValue; // Fallback to raw prop value on error
          }
        } else {
          newValue = propValue;
        }

        if (reactiveKey === "class") {
          console.log("...get", reactiveKey, { newValue });
        }
        return newValue;
      },
      set: function (newValue) {
        if (!bindingPath) {
          return;
        }

        // If bound, update the page state.
        // console.log("...set", newValue, bindingPath);
        set(states || {}, bindingPath, newValue);
      },
      enumerable: true,
      configurable: true,
    });
  }

  // console.log({ reactiveProps });
  return reactiveProps;
}

const RENDER_BINDING_PATTERN = /\{(.+)\}/;

export function isBindableValue(value) {
  let bindingPath = "";
  if (typeof value === "string") {
    const match = value.match(RENDER_BINDING_PATTERN);
    bindingPath = match ? match[1].trim() : null;
  }
  // console.log({ value, bindingPath });
  return !!bindingPath;
}
