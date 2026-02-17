<script>
  import { CircleArrowRight } from "lucide-svelte";
  import {
    initDefinition,
    updateDefinitionByOperationString,
    convertDefinitionToRenderStructure,
  } from "$lib/utilities/json-render";
  import Renderer from "$lib/catalog/Renderer.svelte";

  let prompt = $state(
    "create form, input name, and output simple greeting. The greeting should be in the form of 'Hello, {name}!' with orange text.",
  );
  // $inspect("...prompt", prompt);
  let definition = $state(initDefinition());
  // $inspect("...definition", definition);
  let structure = $state.raw({
    elements: [
      {
        type: "Card",
        props: {
          title: "Greeting Form",
          description: "Enter your name to see a greeting",
          maxWidth: "sm",
          centered: true,
        },
        children: [
          {
            type: "ShortText",
            props: {
              label: "Name",
              value: "$/states/form/name",
            },
          },
          {
            type: "Text",
            props: {
              text: "${/states/form/name ? 'Hello, ' + /states/form/name + '!' : ''}",
              level: "p",
              class: "text-orange-500 font-bold",
            },
          },
        ],
      },
    ],
    states: {
      form: {
        name: "",
      },
    },
  });
  // $inspect("...structure", structure);
  let logOutput = $state(null);
  // $inspect("...logOutput", logOutput);
  let messages = $state([]);
  // $inspect("...messages", messages);
  const sendPrompt = async () => {
    let body = JSON.stringify({ prompt });
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
        messages.push(lastLine);
        break;
      }

      let lines = value.split("\n");
      for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        lastLine += line;

        if (index < lines.length - 1) {
          messages.push(String(lastLine).trim());

          updateDefinitionByOperationString({
            operationString: lastLine,
            definition,
          });
          structure = convertDefinitionToRenderStructure({
            definition,
          });

          lastLine = "";
        }
      }
    }

    updateDefinitionByOperationString({
      operationString: lastLine,
      definition,
    });
    structure = convertDefinitionToRenderStructure({
      definition,
    });

    setTimeout(() => {
      logOutput.scrollTo({
        top: logOutput.scrollHeight, // Scrolls to the maximum height of the content
        behavior: "smooth", // Enables smooth scrolling animation
      });
      // console.log("...logOutput.scrollHeight", logOutput.scrollHeight);
    }, 500);
  };
</script>

<div class="w-full h-dvh flex flex-col">
  <div class="w-full">
    <div class="pt-3 pb-2 px-4 text-lg italic">Flaz</div>
  </div>

  <div class="h-full w-full flex">
    <div class="w-1/4 border-t border-r border-gray-600 flex flex-col">
      <div class="h-full overflow-y-scroll"></div>
      <div class="flex-none h-27 border-t border-gray-600 py-1">
        <textarea
          onkeydown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendPrompt();
              return;
            }
          }}
          bind:value={prompt}
          class="textarea textarea-ghost outline-0 w-full h-full"
          placeholder="Your prompt..."></textarea>
      </div>
      <div
        class={[
          "flex-none flex justify-between items-center pb-3 px-4",
          prompt ? "text-white" : "text-gray-600",
        ]}>
        <div></div>
        <button
          type="button"
          onclick={sendPrompt}
          class="hover:text-gray-400 cursor-pointer">
          <CircleArrowRight class="w-6 h-6" />
        </button>
      </div>
    </div>

    <div class="w-3/4 border-t border-gray-600 flex flex-col py-4">
      <div class="h-full overflow-y-scroll">
        <Renderer {structure} />
      </div>

      <div bind:this={logOutput} class="flex-none border-t border-gray-600">
        <div class="py-2 pl-2 h-36 overflow-y-scroll text-gray-300">
          {#each messages as message}
            <div>{message}</div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
