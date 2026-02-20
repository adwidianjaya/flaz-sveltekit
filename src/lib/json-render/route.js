import { streamText } from "ai";
import { createXai } from "@ai-sdk/xai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  XAI_API_KEY,
  OPENAI_API_KEY,
  ANTHROPIC_API_KEY,
  GEMINI_API_KEY,
} from "$env/static/private";
import color from "picocolors";

import { buildSystemPrompt } from "./prompt";

const xai = createXai({
  apiKey: XAI_API_KEY,
});
const openai = createOpenAI({
  apiKey: OPENAI_API_KEY,
});
const anthropic = createAnthropic({
  apiKey: ANTHROPIC_API_KEY,
});
const google = createGoogleGenerativeAI({
  apiKey: GEMINI_API_KEY,
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
  console.log("...handleRequest", prompt);
  // console.log("...context", color.green(JSON.stringify(context, null, 2)));

  const systemPromptLines = buildSystemPrompt({
    catalog,
    currentElements: context?.elements,
    currentStates: context?.states,
  });
  console.log("...system", color.cyan(systemPromptLines), "\n");
  console.log("...prompt", color.green(prompt));
  // return new Response(prompt);

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const encoder = new TextEncoder();

        const result = streamText({
          model: google("gemini-3-flash"),
          providerOptions: {
            google: {
              thinkingConfig: {
                thinkingBudget: 0,
              },
            },
          },

          // model: anthropic("claude-haiku-4-5-20251001"),

          // model: openai("gpt-5.1-codex-mini"),
          // model: xai("grok-4-1-fast-non-reasoning"),
          messages: [
            { role: "system", content: systemPromptLines },
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
                    reasoningTokens:
                      usage.outputTokenDetails.reasoningTokens || 0,
                    totalTokens: totalUsage.totalTokens,
                  }),
              ),
            );

            console.log("");
            console.log("");
            console.log("...inputTokens", color.red(totalUsage.inputTokens));
            console.log("...outputTokens", color.red(totalUsage.outputTokens));
            console.log(
              "...reasoningTokens",
              color.red(usage.outputTokenDetails.reasoningTokens || 0),
            );
            console.log("...totalTokens", color.red(totalUsage.totalTokens));
            console.log({ usage });

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

        console.warn("\n...output...");
        for await (const textPart of result.textStream) {
          process.stdout.write(textPart);
          controller.enqueue(encoder.encode(textPart));
        }
      } catch (err) {
        console.warn("...error", color.red(err));
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
