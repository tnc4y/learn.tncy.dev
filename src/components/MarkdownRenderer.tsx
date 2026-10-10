"use client";

import React from "react";
import katex from "katex";
import CodeBlock from "@/components/CodeBlock";

interface MarkdownRendererProps {
  content?: string;
  className?: string;
}

interface InlineMarkdownProps {
  text?: string;
  className?: string;
}

function renderKatex(math: string, displayMode: boolean): string {
  try {
    return katex.renderToString(math.trim(), {
      displayMode,
      throwOnError: false,
    });
  } catch {
    return math;
  }
}

function createInlineRegex() {
  // 1-3: Images ![alt](url)
  // 4-6: Links [text](url)
  // 7-8: Inline code `code`
  // 9-10: LaTeX inline math $math$
  // 11-12: Bold Italic ***text***
  // 13-14: Bold **text**
  // 15-16: Italic *text*
  return /(!\[([^\]]*)\]\(([^)]+)\))|(\[([^\]]+)\]\(([^)]+)\))|(`([^`]+)`)|(\$([^\$\s](?:[^\$]*?[^\$\s])?|[^\$\s])\$)|(\*\*\*([^*]+?)\*\*\*)|(\*\*([^*]+?)\*\*)|((?<!\*)\*([^*]+?)\*(?!\*))/g;
}

/**
 * Tokenizes text and renders React nodes with formatting (bold, italic, code, math, links, images).
 * Creates a fresh regex per call so recursive calls never interfere with parent loop state.
 */
export function renderInline(
  text: string,
  keyPrefix = "inline",
  depth = 0
): React.ReactNode[] {
  if (!text) return [];
  if (depth > 3) return [text];

  const regex = createInlineRegex();
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const key = `${keyPrefix}-${keyIndex++}`;

    if (match[1]) {
      // Image ![alt](url)
      const alt = match[2];
      const src = match[3];
      nodes.push(
        <span
          key={key}
          className="inline-block bg-white p-1 rounded-md border border-base-300 my-1 align-middle"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-60 rounded object-contain inline-block"
            loading="lazy"
          />
        </span>
      );
    } else if (match[4]) {
      // Link [text](url)
      const linkText = match[5];
      const linkUrl = match[6];
      const isExternal = linkUrl.startsWith("http://") || linkUrl.startsWith("https://");
      nodes.push(
        <a
          key={key}
          href={linkUrl}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-primary hover:underline font-semibold"
        >
          {renderInline(linkText, `${key}-link`, depth + 1)}
        </a>
      );
    } else if (match[7]) {
      // Inline code `code`
      const code = match[8];
      nodes.push(
        <code
          key={key}
          className="px-1.5 py-0.5 rounded-md bg-base-300/80 font-mono text-[0.88em] text-primary font-bold border border-base-content/10 select-all"
        >
          {code}
        </code>
      );
    } else if (match[9]) {
      // LaTeX inline math $math$
      const mathExpr = match[10];
      const mathHtml = renderKatex(mathExpr, false);
      nodes.push(
        <span
          key={key}
          className="inline-math px-0.5 text-base-content inline-block align-baseline"
          dangerouslySetInnerHTML={{ __html: mathHtml }}
        />
      );
    } else if (match[11]) {
      // Bold italic ***text***
      const inner = match[12];
      nodes.push(
        <strong key={key} className="font-extrabold text-base-content">
          <em className="italic">{renderInline(inner, `${key}-bi`, depth + 1)}</em>
        </strong>
      );
    } else if (match[13]) {
      // Bold **text**
      const inner = match[14];
      nodes.push(
        <strong key={key} className="font-extrabold text-base-content">
          {renderInline(inner, `${key}-b`, depth + 1)}
        </strong>
      );
    } else if (match[15]) {
      // Italic *text*
      const inner = match[16];
      nodes.push(
        <em key={key} className="italic text-base-content/90">
          {renderInline(inner, `${key}-i`, depth + 1)}
        </em>
      );
    }

    // Safety check against zero-width matches
    if (regex.lastIndex === lastIndex) {
      regex.lastIndex++;
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

/**
 * Component for single-line or inline markdown (callout messages, step descriptions, etc.)
 */
export function InlineMarkdown({ text, className = "" }: InlineMarkdownProps) {
  if (!text) return null;
  return <span className={className}>{renderInline(text)}</span>;
}

type MarkdownBlock =
  | { type: "paragraph"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "math"; math: string }
  | { type: "heading"; level: number; text: string }
  | { type: "blockquote"; text: string }
  | { type: "image"; alt: string; src: string }
  | { type: "table"; headers: string[]; rows: string[][] };

function parseMarkdownBlocks(text: string): MarkdownBlock[] {
  if (!text) return [];

  const lines = text.split("\n");
  const blocks: MarkdownBlock[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;
  let currentCode: { lang: string; lines: string[] } | null = null;
  let currentMath: string[] | null = null;
  let currentTable: string[] | null = null;
  let currentParagraph: string[] = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      blocks.push({
        type: "paragraph",
        text: currentParagraph.join("\n"),
      });
      currentParagraph = [];
    }
  }

  function flushList() {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  }

  function flushTable() {
    if (currentTable) {
      if (currentTable.length >= 2) {
        const rawRows = currentTable.map((r) =>
          r.slice(1, -1).split("|").map((c) => c.trim())
        );
        const headers = rawRows[0];
        const isSeparator =
          rawRows.length > 1 && rawRows[1].every((c) => /^:?-+:?$/.test(c));
        const rows = isSeparator ? rawRows.slice(2) : rawRows.slice(1);
        blocks.push({ type: "table", headers, rows });
      } else {
        currentParagraph.push(...currentTable);
      }
      currentTable = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Inside multiline math block ($$)
    if (currentMath) {
      if (line.trim().startsWith("$$")) {
        blocks.push({
          type: "math",
          math: currentMath.join("\n"),
        });
        currentMath = null;
      } else {
        currentMath.push(line);
      }
      continue;
    }

    // Inside fenced code block
    if (currentCode) {
      if (line.trim().startsWith("```")) {
        blocks.push({
          type: "code",
          lang: currentCode.lang,
          code: currentCode.lines.join("\n"),
        });
        currentCode = null;
      } else {
        currentCode.lines.push(line);
      }
      continue;
    }

    // Single line block math ($$...$$)
    const singleMathMatch = line.trim().match(/^\$\$(.+?)\$\$$/);
    if (singleMathMatch) {
      flushParagraph();
      flushList();
      flushTable();
      blocks.push({
        type: "math",
        math: singleMathMatch[1].trim(),
      });
      continue;
    }

    // Multiline math block start ($$)
    if (line.trim() === "$$") {
      flushParagraph();
      flushList();
      flushTable();
      currentMath = [];
      continue;
    }

    // Fenced code block start
    if (line.trim().startsWith("```")) {
      flushParagraph();
      flushList();
      flushTable();
      const lang = line.trim().slice(3).trim();
      currentCode = { lang, lines: [] };
      continue;
    }

    // Image (![alt](src))
    const imgMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      flushParagraph();
      flushList();
      flushTable();
      blocks.push({
        type: "image",
        alt: imgMatch[1],
        src: imgMatch[2],
      });
      continue;
    }

    // Table rows (| ... |)
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      flushParagraph();
      flushList();
      if (!currentTable) currentTable = [];
      currentTable.push(line.trim());
      continue;
    } else {
      flushTable();
    }

    // Headings (# Heading)
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      continue;
    }

    // Blockquote (> Quote)
    if (line.startsWith("> ") || line.trim() === ">") {
      flushParagraph();
      flushList();
      const quoteText = line.startsWith("> ") ? line.slice(2) : "";
      blocks.push({
        type: "blockquote",
        text: quoteText,
      });
      continue;
    }

    // Unordered list item (- or *)
    const ulMatch = line.match(/^(\s*)[-*]\s+(.*)$/);
    if (ulMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(ulMatch[2]);
      continue;
    }

    // Ordered list item (1. 2.)
    const olMatch = line.match(/^(\s*)\d+\.\s+(.*)$/);
    if (olMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(olMatch[2]);
      continue;
    }

    // Empty line breaks blocks
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    // Regular line in paragraph
    flushList();
    currentParagraph.push(line);
  }

  flushParagraph();
  flushList();
  flushTable();

  if (currentMath) {
    blocks.push({
      type: "math",
      math: currentMath.join("\n"),
    });
  }

  if (currentCode) {
    blocks.push({
      type: "code",
      lang: currentCode.lang,
      code: currentCode.lines.join("\n"),
    });
  }

  return blocks;
}

/**
 * Full Markdown Renderer for articles, tutorials, lesson sections, and guides.
 * Supports paragraphs, bold, italic, inline code, fenced code blocks, lists, headings, tables, and blockquotes.
 */
export default function MarkdownRenderer({
  content = "",
  className = "",
}: MarkdownRendererProps) {
  if (!content) return null;

  const blocks = parseMarkdownBlocks(content);

  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "paragraph": {
            const sublines = block.text.split("\n");
            return (
              <p key={idx} className="leading-relaxed text-base-content/85">
                {sublines.map((line, lIdx) => (
                  <React.Fragment key={lIdx}>
                    {lIdx > 0 && <br />}
                    {renderInline(line, `p-${idx}-${lIdx}`)}
                  </React.Fragment>
                ))}
              </p>
            );
          }

          case "ul":
            return (
              <ul key={idx} className="space-y-2 my-3 pl-1 list-none">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5">
                    <span className="text-primary font-bold mt-1 shrink-0 text-sm leading-none select-none">
                      •
                    </span>
                    <span className="flex-1 leading-relaxed text-base-content/85">
                      {renderInline(item, `ul-${idx}-${itemIdx}`)}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={idx} className="space-y-2 my-3 pl-1 list-none">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-primary/10 text-primary font-mono text-xs font-bold shrink-0 mt-0.5 select-none">
                      {itemIdx + 1}
                    </span>
                    <span className="flex-1 leading-relaxed text-base-content/85">
                      {renderInline(item, `ol-${idx}-${itemIdx}`)}
                    </span>
                  </li>
                ))}
              </ol>
            );

          case "code":
            return (
              <CodeBlock
                key={idx}
                code={block.code}
                language={block.lang || "systemverilog"}
                className="my-4"
              />
            );

          case "heading": {
            const headingNodes = renderInline(block.text, `h-${idx}`);
            if (block.level === 1) {
              return (
                <h1
                  key={idx}
                  className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight mt-6 mb-2"
                >
                  {headingNodes}
                </h1>
              );
            }
            if (block.level === 2) {
              return (
                <h2
                  key={idx}
                  className="text-xl sm:text-2xl font-bold text-base-content tracking-tight mt-5 mb-2 border-b border-base-content/10 pb-1.5"
                >
                  {headingNodes}
                </h2>
              );
            }
            if (block.level === 3) {
              return (
                <h3
                  key={idx}
                  className="text-lg sm:text-xl font-bold text-base-content tracking-tight mt-4 mb-1.5"
                >
                  {headingNodes}
                </h3>
              );
            }
            return (
              <h4
                key={idx}
                className="text-base sm:text-lg font-semibold text-base-content tracking-tight mt-3 mb-1"
              >
                {headingNodes}
              </h4>
            );
          }

          case "blockquote":
            return (
              <blockquote
                key={idx}
                className="my-3 pl-4 border-l-4 border-primary/40 bg-base-200/50 py-2 pr-3 rounded-r-lg italic text-base-content/80 text-sm leading-relaxed"
              >
                {renderInline(block.text, `quote-${idx}`)}
              </blockquote>
            );

          case "table":
            return (
              <div
                key={idx}
                className="overflow-x-auto my-4 rounded-xl border border-base-300 shadow-xs"
              >
                <table className="table table-sm w-full bg-base-100">
                  <thead>
                    <tr className="bg-base-200/80 border-b border-base-300">
                      {block.headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="font-mono text-xs font-bold text-base-content py-2 px-3"
                        >
                          {renderInline(h, `th-${idx}-${hIdx}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-base-200/30 border-b border-base-300/50 last:border-none"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="text-xs text-base-content/85 py-2 px-3"
                          >
                            {renderInline(cell, `td-${idx}-${rIdx}-${cIdx}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "math":
            return (
              <div
                key={idx}
                className="my-5 py-3 px-4 bg-base-200/50 rounded-xl overflow-x-auto flex justify-center items-center border border-base-300 shadow-xs text-base-content"
                dangerouslySetInnerHTML={{
                  __html: renderKatex(block.math, true),
                }}
              />
            );

          case "image":
            return (
              <figure key={idx} className="my-6 flex flex-col items-center">
                <div className="rounded-xl overflow-hidden border border-base-300 bg-white p-4 shadow-sm max-w-full flex justify-center items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.src}
                    alt={block.alt}
                    className="max-h-[500px] w-auto max-w-full object-contain rounded mx-auto"
                    loading="lazy"
                  />
                </div>
                {block.alt && (
                  <figcaption className="text-xs text-base-content/65 text-center mt-2 italic max-w-lg">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
