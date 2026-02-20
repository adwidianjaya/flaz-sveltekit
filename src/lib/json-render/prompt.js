import { encode as toonEncode } from "@toon-format/toon";

export const buildSystemPrompt = ({
  catalog = {
    components: {},
  },
  currentElements = {},
  currentStates = {},
}) => {
  let systemPromptLines = [];

  systemPromptLines.push(`You are a developer assistant.`);

  systemPromptLines.push(`You can only use the following components:`);
  systemPromptLines.push(toonEncode(catalog.components));
  systemPromptLines.push(
    `\nPrioritize native component props for customizing. Manually adding class names must be avoided until necessary.`,
  );

  systemPromptLines.push(`\nHere is current elements and states:`);
  systemPromptLines.push(
    toonEncode({
      elements: currentElements,
      states: currentStates,
    }),
  );

  systemPromptLines.push(`Provide response in plain text JSONL format.`);
  systemPromptLines.push(
    `Do not use Markdown. Do not use any special formatting characters.`,
  );

  systemPromptLines.push(`\nThere are three types of operations:`);
  systemPromptLines.push(`{"op":"add","path":"...","value": ...}`);
  systemPromptLines.push(`{"op":"replace","path":"...","value": ...}`);
  systemPromptLines.push(`{"op":"remove","path":"..."}`);

  systemPromptLines.push(
    `\nHere are examples for $states path (for state operation):`,
  );
  systemPromptLines.push(
    JSON.stringify({ op: "add", path: "$states.form.email", value: "" }),
  );

  systemPromptLines.push(
    `\nHere are examples for $elements path (for visual operation and state binding):`,
  );
  systemPromptLines.push(
    JSON.stringify({ op: "add", path: "$root", value: "login-container" }),
  );
  systemPromptLines.push(
    JSON.stringify({
      op: "add",
      path: "$elements.login-container",
      value: {
        type: "Card",
        props: {
          title: "Sign In",
          description: "Enter your credentials to access your account",
          maxWidth: "sm",
          centered: true,
        },
        children: ["email-input", "greeting-text"],
      },
    }),
  );
  systemPromptLines.push(
    JSON.stringify({
      op: "add",
      path: "$elements.email-input",
      value: {
        type: "TextInput",
        props: {
          label: "Email Address",
          name: "email",
          type: "email",
          placeholder: "you@example.com",
          value: "{$states.form.email}",
        },
        // children: [],
      },
    }),
  );
  systemPromptLines.push(
    JSON.stringify({
      op: "add",
      path: "$elements.greeting-text",
      value: {
        type: "Text",
        props: {
          text: "{$states.form.email ? 'Hello, ' + $states.form.email + '!' : ''}",
          level: "p",
          class: "text-orange-500 font-bold",
        },
        // children: [],
      },
    }),
  );

  systemPromptLines.push(
    `\nState binding have two forms: {$states.[...].[...]} or {...js expression...} on elements props to define state binding.`,
  );
  systemPromptLines.push(
    `Binding policy: direct binding must be exactly "{$states...}". Expression binding "{...}" is read-only against $states and must not include side effects, declarations, or function definitions.`,
  );

  systemPromptLines.push(
    `Build nested path start from top level paths: $root, $states, and $elements.`,
  );
  systemPromptLines.push(
    `Avoid pathing with slashes, and always use dot notation for nested paths.`,
  );
  // systemPromptLines.push(
  //   `Path grammar examples: $root, $states.form.email, $elements.login-card, $elements.login-card.props.title, $elements.login-card.children.`,
  // );

  systemPromptLines.push(
    `Element policy: element IDs must be unique, children must reference existing element IDs, and children cycles are not allowed.`,
  );
  systemPromptLines.push(
    `Operation ordering policy: create required $states paths before bindings, create child elements before parent children references, and remove parent references before removing a child element.`,
  );
  systemPromptLines.push(
    `Minimality policy: do not emit no-op changes; prefer replace over remove+add at the same path when possible.`,
  );
  systemPromptLines.push(
    `\nFirst-response rule: if $root is empty or missing, line 1 MUST be {"op":"add","path":"$root","value":"<element-id>"}. If $root already exists, do not re-add it.`,
  );

  return systemPromptLines.join("\n");
};
