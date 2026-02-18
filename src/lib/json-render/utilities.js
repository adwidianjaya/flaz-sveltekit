import { set } from "lodash-es";

export const initDefinition = () => {
  return {
    root: "",
    states: {},
    elements: {},
  };
};

export const updateDefinitionByOperationString = ({
  operationString,
  definition,
}) => {
  let operation = null;
  try {
    operation = JSON.parse(operationString);
  } catch (err) {
    console.warn(
      "...error parsing operationString",
      err.message,
      // color.red(operationString),
    );
  }
  // console.log(
  //   "\n...updateDefinition",
  //   color.yellow(JSON.stringify(operation, null, 2)),
  // );
  if (!operation) return definition;

  if (operation.path.startsWith("$states")) {
    if (operation.op === "remove") {
      // do nothing
    } else {
      set(
        definition.states,
        operation.path.split("$states.").join(""),
        operation.value,
      );
    }
  } else if (operation.path.startsWith("$elements")) {
    if (operation.op === "remove") {
      delete definition.elements[operation.path.split("$elements.").join("")];
    } else if (operation.op === "replace") {
      definition.elements[operation.path.split("$elements.").join("")] =
        operation.value;
    } else if (operation.op === "add") {
      const elementId = operation.path.split("$elements.").join("");
      definition.elements[elementId] = operation.value;
    }
  } else if (operation.path.startsWith("$root")) {
    definition.root = operation.value;
  }

  return definition;
};

const convertChildToRenderStructure = ({ element, definition }) => {
  if (!element) return null;

  let renderStructure = JSON.parse(JSON.stringify(element));

  if (renderStructure.children?.length > 0) {
    renderStructure.children = renderStructure.children
      .map(childId => {
        return convertChildToRenderStructure({
          element: definition.elements[childId],
          definition,
        });
      })
      .filter(child => !!child);
  }

  return renderStructure;
};

export const convertDefinitionToRenderStructure = ({ definition }) => {
  if (!definition.root || !definition.elements[definition.root]) {
    return {};
  }

  let render = {
    elements: [
      convertChildToRenderStructure({
        element: definition.elements[definition.root],
        definition,
      }),
    ],
    states: JSON.parse(JSON.stringify(definition.states)),
  };

  return render;
};
