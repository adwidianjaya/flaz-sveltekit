<script module>
  import { z } from "zod";

  export const spec = {
    description:
      "Rich text renderer for plain text, markdown, or sanitized HTML content.",
    tags: ["Content"],
    props: z
      .object({
        content: z.string().optional(),
        format: z.enum(["plain", "markdown", "html"]).optional(),
        class: z.string().optional(),
      })
      .toJSONSchema(),
  };
</script>

<script>
  const {
    props = $bindable({
      content: "",
      format: "plain",
      class: "",
    }),
  } = $props();

  const escapeHtml = value =>
    String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const applyInlineMarkdown = value => {
    const escaped = escapeHtml(value);
    return escaped
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, label, href) => {
        return `<a href="${href}" target="_blank" rel="noreferrer noopener">${label}</a>`;
      })
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  };

  const markdownToHtml = value => {
    const blocks = String(value || "")
      .split(/\n{2,}/)
      .map(block => block.trim())
      .filter(Boolean);

    return blocks
      .map(block => {
        if (/^#{1,6}\s/.test(block)) {
          const level = block.match(/^#+/)?.[0].length || 1;
          const text = block.replace(/^#{1,6}\s+/, "");
          return `<h${level}>${applyInlineMarkdown(text)}</h${level}>`;
        }

        const lines = block.split("\n").map(line => line.trim());

        if (lines.every(line => /^[-*]\s+/.test(line))) {
          const items = lines
            .map(line => `<li>${applyInlineMarkdown(line.replace(/^[-*]\s+/, ""))}</li>`)
            .join("");
          return `<ul>${items}</ul>`;
        }

        if (lines.every(line => /^\d+\.\s+/.test(line))) {
          const items = lines
            .map(line => `<li>${applyInlineMarkdown(line.replace(/^\d+\.\s+/, ""))}</li>`)
            .join("");
          return `<ol>${items}</ol>`;
        }

        return `<p>${applyInlineMarkdown(block).replaceAll("\n", "<br/>")}</p>`;
      })
      .join("");
  };

  // Limited sanitization: removes script/style tags, inline event handlers, and javascript: links.
  const sanitizeHtml = value =>
    String(value || "")
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
      .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
      .replace(/\son\w+\s*=\s*[^\s>]+/gi, "")
      .replace(
        /(href|src)\s*=\s*("|')\s*javascript:[\s\S]*?\2/gi,
        '$1=$2#$2',
      );

  const markdownHtml = $derived(markdownToHtml(props.content));
  const safeHtml = $derived(sanitizeHtml(props.content));
</script>

{#if props.format === "html"}
  <div class={["prose max-w-none", props.class]}>{@html safeHtml}</div>
{:else if props.format === "markdown"}
  <div class={["prose max-w-none", props.class]}>{@html markdownHtml}</div>
{:else}
  <div class={["whitespace-pre-line", props.class]}>{props.content}</div>
{/if}
