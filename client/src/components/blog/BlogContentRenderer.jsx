import React from "react";

/**
 * Checks if the content string contains block-level HTML tags
 */
const hasBlockHtml = (str) => {
  if (!str || typeof str !== "string") return false;
  return /<\s*(p|div|h[1-6]|ul|ol|li|blockquote|table|section|article|header|footer)\b[^>]*>/i.test(str);
};

/**
 * Checks if a block of text looks like a section sub-heading
 */
const isShortHeading = (text) => {
  const trimmed = text.trim();
  if (trimmed.length > 70) return false;
  if (trimmed.includes("\n")) return false;
  // Does not end with standard sentence punctuation
  if (/[.,;?!]$/.test(trimmed)) return false;
  // Does not start with list bullets or numbers
  if (/^[-*•\d]/.test(trimmed)) return false;
  // Exclude lowercase starting sentences
  if (/^[a-z]/.test(trimmed)) return false;
  return true;
};

/**
 * Checks if a block of text is an unordered list (every non-empty line starts with - or * or •)
 */
const isUnorderedList = (text) => {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return false;
  return lines.every(l => /^[-*•]\s+/.test(l));
};

/**
 * Checks if a block of text is an ordered list (every non-empty line starts with 1. 2. etc.)
 */
const isOrderedList = (text) => {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return false;
  return lines.every(l => /^\d+[.)]\s+/.test(l));
};

/**
 * Checks if a string contains inline HTML tags like <b>, <i>, <a>, <span>, etc.
 */
const hasInlineHtml = (str) => {
  return /<\s*(b|strong|i|em|u|s|a|span|code|br)\b[^>]*>/i.test(str);
};

export const BlogContentRenderer = ({ content }) => {
  if (!content || typeof content !== "string") {
    return <p className="text-slate-400 italic">No content available.</p>;
  }

  // Case 1: Rich HTML content with block tags
  if (hasBlockHtml(content)) {
    return (
      <div
        className="blog-article-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Case 2: Plain text with paragraphs (\n\n) and line breaks (\n)
  const blocks = content
    .split(/\r?\n\s*\r?\n+/)
    .map(b => b.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    return <p className="text-slate-400 italic">No content available.</p>;
  }

  return (
    <div className="blog-article-content space-y-6">
      {blocks.map((block, index) => {
        // 1. Markdown Headings
        if (block.startsWith("### ")) {
          return (
            <h4 key={index} className="text-lg md:text-xl font-bold text-sky-400 mt-6 mb-2 tracking-tight">
              {block.replace(/^###\s+/, "")}
            </h4>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h3 key={index} className="text-xl md:text-2xl font-bold text-white mt-8 mb-3 tracking-tight">
              {block.replace(/^##\s+/, "")}
            </h3>
          );
        }
        if (block.startsWith("# ")) {
          return (
            <h2 key={index} className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4 tracking-tight">
              {block.replace(/^#\s+/, "")}
            </h2>
          );
        }

        // 2. Blockquotes (> quote)
        if (block.startsWith("> ")) {
          const quoteText = block.replace(/^>\s*/gm, "");
          return (
            <blockquote key={index} className="border-l-4 border-sky-400 pl-5 py-3 my-6 text-slate-300 italic bg-white/5 rounded-r-xl">
              {hasInlineHtml(quoteText) ? (
                <span dangerouslySetInnerHTML={{ __html: quoteText }} />
              ) : (
                quoteText
              )}
            </blockquote>
          );
        }

        // 3. Unordered Lists (- item or * item)
        if (isUnorderedList(block)) {
          const items = block.split("\n").map(l => l.replace(/^[-*•]\s+/, "").trim()).filter(Boolean);
          return (
            <ul key={index} className="list-disc pl-6 space-y-2 mb-6 text-slate-300 text-base sm:text-lg">
              {items.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {hasInlineHtml(item) ? (
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          );
        }

        // 4. Ordered Lists (1. item)
        if (isOrderedList(block)) {
          const items = block.split("\n").map(l => l.replace(/^\d+[.)]\s+/, "").trim()).filter(Boolean);
          return (
            <ol key={index} className="list-decimal pl-6 space-y-2 mb-6 text-slate-300 text-base sm:text-lg">
              {items.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {hasInlineHtml(item) ? (
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ol>
          );
        }

        // 5. Short Standalone Subheadings
        if (isShortHeading(block)) {
          return (
            <h2 key={index} className="text-2xl md:text-3xl font-bold text-white mt-10 mb-3 tracking-tight">
              {block}
            </h2>
          );
        }

        // 6. Regular Paragraph (preserves single line breaks with whitespace-pre-line)
        return (
          <p
            key={index}
            className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal whitespace-pre-line"
          >
            {hasInlineHtml(block) ? (
              <span dangerouslySetInnerHTML={{ __html: block }} />
            ) : (
              block
            )}
          </p>
        );
      })}
    </div>
  );
};

export default BlogContentRenderer;
