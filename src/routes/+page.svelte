<script>
  import {
    initDefinition,
    updateDefinitionByOperationString,
    convertDefinitionToRenderSchema,
  } from "$lib/json-render/utilities";
  import Renderer from "$lib/json-render/Renderer.svelte";
  import logo from "$lib/assets/logo-bg.png";
  import LogViewer from "./LogViewer.svelte";
  import SchemaViewer from "./SchemaViewer.svelte";
  import PromptInput from "./PromptInput.svelte";
  import { schema as schemaMocked } from "./mock";

  let definition = $state(initDefinition());
  // $inspect("...definition", definition);

  let schema = $state({
    // ...schemaMocked,
    elements: [],
    states: {},
  });
  // $inspect("...schema", schema);

  let logs = $state([]);
  // $inspect("...logs", logs);

  let prompt = $state(
    `create a form, input name, and output simple greeting. The greeting should be in the form of 'Hello, {name}!'. if name is empty, render "No Name" with orange text. then check name length, if above 10, render Name is too long. if name is "Adhe", render "Noice", else render the name`,
    // "change to Bahasa Indonesia",
  );
  // $inspect("...prompt", prompt);

  let loading = $state(false);
  const handleSendPrompt = async () => {
    loading = true;

    try {
      let body = JSON.stringify({
        prompt,
        context: {
          ...definition,
        },
      });
      // prompt = "";
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
    } catch (err) {}

    loading = false;
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

      <PromptInput bind:prompt {handleSendPrompt} {loading} />
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
