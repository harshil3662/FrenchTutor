import React from 'react';

/**
 * Formats a string containing Markdown bold syntax (**bold**), <strong>, <b>, or code blocks (`code`)
 * into safe React Virtual DOM elements without dangerouslySetInnerHTML.
 *
 * @param {string} text - Raw input text with optional bold or inline code formatting
 * @param {Object} options - Customization options (e.g. boldClassName, codeClassName)
 * @returns {React.ReactNode} - React elements with bolded/formatted spans
 */
export function formatBoldText(text, options = {}) {
  if (!text) return text;
  if (typeof text !== 'string') return text;

  const boldClass = options.boldClassName || 'font-bold text-[#1F1F18]';
  const codeClass = options.codeClassName || 'px-1 py-0.5 rounded bg-[#FAF7F2] border border-[#E8E2D9] font-mono text-[0.9em] text-[#5A5A40] font-semibold';

  // Match:
  // 1. **bold text**
  // 2. <strong>bold text</strong>
  // 3. <b>bold text</b>
  // 4. `inline code`
  const tokenRegex = /(\*\*[^*]+?\*\*|<strong>[\s\S]*?<\/strong>|<b>[\s\S]*?<\/b>|`[^`]+?`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // **bold**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const content = part.slice(2, -2);
      return (
        <strong key={index} className={boldClass}>
          {content}
        </strong>
      );
    }

    // <strong>bold</strong>
    if (part.startsWith('<strong>') && part.endsWith('</strong>') && part.length >= 17) {
      const content = part.slice(8, -9);
      return (
        <strong key={index} className={boldClass}>
          {content}
        </strong>
      );
    }

    // <b>bold</b>
    if (part.startsWith('<b>') && part.endsWith('</b>') && part.length >= 7) {
      const content = part.slice(3, -4);
      return (
        <strong key={index} className={boldClass}>
          {content}
        </strong>
      );
    }

    // `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const content = part.slice(1, -1);
      return (
        <code key={index} className={codeClass}>
          {content}
        </code>
      );
    }

    return part;
  });
}
