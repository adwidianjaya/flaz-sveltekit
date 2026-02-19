import { streamText } from "ai";
import { createXai } from "@ai-sdk/xai";
import { XAI_API_KEY } from "$env/static/private";
import color from "picocolors";
import { encode as toonEncode } from "@toon-format/toon";

const xai = createXai({
  apiKey: XAI_API_KEY,
});

const componentModules = import.meta.glob(
  ["./catalog/components/**/*.svelte"],
  { eager: true, import: "spec" },
);
// console.log({ componentModules });
const catalog = {
  components: Object.keys(componentModules).map(path => {
    const splits = String(path.split("/components/")[1] || "").split("/");
    // console.log({ splits });
    // const group = splits[0];
    const name = splits[0].split(".")[0];
    const spec = componentModules[path];
    // console.log({ spec });
    const props = spec.props?.properties || {};
    // console.log({ props });

    const result = {
      ...spec,
      // _id: path,
      // path,
      // group,
      name: spec.name || name,
      props,
    };
    return result;
  }),
};
// console.log("...catalog", color.yellow(JSON.stringify(catalog, null, 2)));

const handleRequest = async ({ request }) => {
  const { prompt, context } = await request.json();
  console.log("...prompt", color.green(prompt));
  console.log("...context", color.green(JSON.stringify(context, null, 2)));

  const systemPromptLines = [];
  systemPromptLines.push(`You are a developer assistant.`);

  systemPromptLines.push(`You can only use the following components:`);
  // systemPromptLines.push(JSON.stringify(catalog.components, null, 2));
  systemPromptLines.push(toonEncode(catalog.components));

  systemPromptLines.push(
    `Response with JSONL format only. Avoid any markdown formatting.`,
  );

  systemPromptLines.push(`\nThere are three types of operations:`);
  systemPromptLines.push(`{"op":"add","path":"...","value": ...}`);
  systemPromptLines.push(`{"op":"replace","path":"...","value": ...}`);
  systemPromptLines.push(`{"op":"remove","path":"...","value": ...}`);

  systemPromptLines.push(
    `\nHere are examples for $states path (for state definition):`,
  );
  systemPromptLines.push(
    JSON.stringify({ op: "add", path: "$states.form.email", value: "" }),
  );

  systemPromptLines.push(
    `\nHere are examples for $elements path (for visual definition and state binding):`,
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
    `\nAlways produce operation on $root path for first response.`,
  );

  systemPromptLines.push(`\nHere is current elements and states:`);
  systemPromptLines.push(toonEncode(context));

  console.log("...system", color.cyan(systemPromptLines.join("\n")), "\n");
  // return new Response(prompt);

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const result = streamText({
        model: xai("grok-4-1-fast-non-reasoning"),
        // model: xai("grok-4-1-fast-reasoning"),
        messages: [
          { role: "system", content: systemPromptLines.join("\n") },
          { role: "user", content: prompt },
        ].filter(message => !!message.content),
        onFinish: ({
          text,
          finishReason,
          usage,
          response,
          steps,
          totalUsage,
        }) => {
          controller.enqueue(
            encoder.encode(
              "\n" +
                JSON.stringify({
                  op: "info",
                  inputTokens: totalUsage.inputTokens,
                  outputTokens: totalUsage.outputTokens,
                  totalTokens: totalUsage.totalTokens,
                }),
            ),
          );

          console.log("");
          console.log("");
          console.log("...inputTokens", color.red(totalUsage.inputTokens));
          console.log("...outputTokens", color.red(totalUsage.outputTokens));
          console.log("...totalTokens", color.red(totalUsage.totalTokens));

          controller.close();
        },
        onError: error => {
          console.error("...error", error);
          controller.enqueue(
            encoder.encode(
              "\n" +
                JSON.stringify({
                  op: "error",
                  message: error.message,
                }),
            ),
          );

          controller.close();
        },
      });

      for await (const textPart of result.textStream) {
        process.stdout.write(textPart);
        controller.enqueue(encoder.encode(textPart));
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};

export { handleRequest };
