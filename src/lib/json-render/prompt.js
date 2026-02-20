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
  // systemPromptLines.push(JSON.stringify(catalog.components, null, 2));
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

  systemPromptLines.push(
    `Response with JSONL format only. Avoid any markdown formatting.`,
  );

  systemPromptLines.push(`\nThere are three types of operations:`);
  systemPromptLines.push(`{"op":"add","path":"...","value": ...}`);
  systemPromptLines.push(`{"op":"replace","path":"...","value": ...}`);
  systemPromptLines.push(`{"op":"remove","path":"...","value": ...}`);

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
          checks: [
            { type: "required", message: "Email is required" },
            { type: "email", message: "Please enter a valid email" },
          ],
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

  systemPromptLines.push(`\nState binding have two forms:`);
  // systemPromptLines.push(
  //   "$states.[...].[...] on elements props to define two way state binding for reactivity.",
  // );
  systemPromptLines.push(
    "{$states.[...].[...]} or {...js expression...} on elements props to define state binding.",
  );

  systemPromptLines.push(
    `Build nested path start from top level paths: $root, $states, and $elements.`,
  );
  systemPromptLines.push(
    `Avoid pathing with slashes, and always use dot notation for nested paths.`,
  );
  systemPromptLines.push(
    `\nAlways produce operation on $root path for first response.`,
  );

  return systemPromptLines.join("\n");
};
