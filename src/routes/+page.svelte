<script>
  import { CircleArrowRight } from "lucide-svelte";
  import {
    initDefinition,
    updateDefinitionByOperationString,
    convertDefinitionToRenderSchema,
  } from "$lib/json-render/utilities";
  import Renderer from "$lib/json-render/Renderer.svelte";
  import logo from "$lib/assets/logo-bg.png";
  import LogViewer from "./LogViewer.svelte";
  import SchemaViewer from "./SchemaViewer.svelte";

  let prompt = $state(
    "create form, input name, and output simple greeting. The greeting should be in the form of 'Hello, {name}!' with orange text.",
    // "change to Bahasa Indonesia",
  );
  // $inspect("...prompt", prompt);
  let definition = $state(initDefinition());
  // let definition = $state({
  //   root: "login-container",
  //   states: {
  //     form: {
  //       name: "",
  //     },
  //   },
  //   elements: {
  //     "login-container": {
  //       type: "Card",
  //       props: {
  //         title: "Greeting Form",
  //         description: "Enter your name to see a greeting",
  //         maxWidth: "sm",
  //         centered: true,
  //       },
  //       children: ["name-input", "greeting-text"],
  //     },
  //     "name-input": {
  //       type: "ShortText",
  //       props: {
  //         label: "Name",
  //         placeholder: "Enter your name",
  //         value: "$states.form.name",
  //       },
  //     },
  //     "greeting-text": {
  //       type: "Text",
  //       props: {
  //         text: "{$states.form.name ? 'Hello, ' + $states.form.name + '!' : ''}",
  //         level: "p",
  //         class: "text-orange-500 font-bold",
  //       },
  //     },
  //   },
  // });
  // $inspect("...definition", definition);
  let schema = $state({
    elements: [],
    states: {},
  });
  // let schema = $state({
  //   elements: [
  //     {
  //       type: "Card",
  //       props: {
  //         title: "Greeting Form",
  //         description: "Enter your name to see a greeting",
  //         maxWidth: "sm",
  //         centered: true,
  //       },
  //       children: [
  //         {
  //           type: "ShortText",
  //           props: {
  //             label: "Name",
  //             value: "$states.form.name",
  //           },
  //         },
  //         {
  //           type: "Text",
  //           props: {
  //             text: "{$states.form.name ? 'Hello, ' + $states.form.name + '!' : ''}",
  //             level: "p",
  //             class: "text-orange-500 font-bold",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  //   states: {
  //     form: {
  //       name: "",
  //     },
  //   },
  // });
  // $inspect("...schema", schema);
  let logs = $state([]);
  // $inspect("...logs", logs);

  const sendPrompt = async () => {
    let body = JSON.stringify({
      prompt,
      context: {
        ...definition,
      },
    });
    prompt = "";
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const reader = response.body
      ?.pipeThrough(new TextDecoderStream())
      .getReader();
    if (!reader) return;

    let lastLine = "";
    while (true) {
      const { value, done } = await reader.read();
      // console.log({ value, done });
      if (done) {
        break;
      }

      let lines = value.split("\n");
      for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        lastLine += line;

        if (index < lines.length - 1) {
          lastLine = String(lastLine).trim();

          const { operation } = updateDefinitionByOperationString({
            operationString: lastLine,
            definition,
          });
          if (operation) {
            logs.push({
              operation,
              message: lastLine,
            });
          }
          schema = convertDefinitionToRenderSchema({
            definition,
            initialStates: schema.states,
          });

          lastLine = "";
        }
      }
    }

    lastLine = String(lastLine).trim();
    if (lastLine) {
      const { operation } = updateDefinitionByOperationString({
        operationString: lastLine,
        definition,
      });
      if (operation) {
        logs.push({
          operation,
          message: lastLine,
        });
      }
      schema = convertDefinitionToRenderSchema({
        definition,
        initialStates: schema.states,
      });

      lastLine = "";
    }
  };
</script>

<svelte:head>
  <title>Flaz</title>
</svelte:head>

<div class="flex flex-col w-full h-dvh">
  <div class="w-full italic font-semibold py-3 px-4">
    <img
      src={logo}
      alt="Flaz Logo"
      class="h-8 w-auto inline-block rounded-lg overflow-hidden" />
    &nbsp; Flaz
  </div>

  <div class="flex flex-1 overflow-hidden">
    <div class={["w-1/4 flex flex-col", "border-b border-t border-gray-700"]}>
      <SchemaViewer {schema} />

      <div class="h-32 flex-none border-t border-gray-700 flex flex-col">
        <textarea
          placeholder="Talk to Flaz here..."
          onkeydown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendPrompt();
              return;
            }
          }}
          bind:value={prompt}
          class="w-full h-full outline-0 text-sm px-3 py-2"></textarea>
        <div class="text-right flex-none">
          <button
            type="button"
            onclick={sendPrompt}
            class={[
              "px-2 pb-2 cursor-pointer",
              "text-gray-200 hover:text-gray-400",
              "transition duration-100",
            ]}>
            <CircleArrowRight class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <div
      class={[
        "w-3/4 flex flex-col",
        "border-b border-t border-l border-gray-700",
      ]}>
      <div class="w-full h-full text-xs overflow-scroll">
        <div
          class="sticky top-0 z-10 bg-gray-600 px-2 py-1 mb-1 text-xs text-gray-400">
          Preview
        </div>
        <div class="px-3 py-2">
          <Renderer bind:states={schema.states} elements={schema.elements} />
        </div>
      </div>

      <LogViewer {logs} />
    </div>
  </div>
</div>
