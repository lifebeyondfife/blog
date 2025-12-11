export interface ProtectedMathResult {
  processedContent: string;
  mathExpressions: Map<string, string>;
}

const INLINE_MATH_PATTERN = /\\\([\s\S]*?\\\)/g;
const BLOCK_MATH_PATTERN = /\\\[[\s\S]*?\\\]/g;

function generatePlaceholder(type: 'inline' | 'block', index: number): string {
  return `‹‹MATH_${type.toUpperCase()}_${index}››`;
}

export function protectMathDelimiters(markdown: string): ProtectedMathResult {
  const mathExpressions = new Map<string, string>();
  let inlineIndex = 0;
  let blockIndex = 0;

  let processedContent = markdown.replace(BLOCK_MATH_PATTERN, (match) => {
    const placeholder = generatePlaceholder('block', blockIndex++);
    mathExpressions.set(placeholder, match);
    return placeholder;
  });

  processedContent = processedContent.replace(INLINE_MATH_PATTERN, (match) => {
    const placeholder = generatePlaceholder('inline', inlineIndex++);
    mathExpressions.set(placeholder, match);
    return placeholder;
  });

  return { processedContent, mathExpressions };
}

export function restoreMathDelimiters(
  html: string,
  mathExpressions: Map<string, string>
): string {
  let restoredHtml = html;

  for (const [placeholder, originalMath] of mathExpressions) {
    const isInline = placeholder.includes('INLINE');
    const wrappedMath = isInline
      ? `<span class="math-inline">${originalMath}</span>`
      : `<div class="math-block">${originalMath}</div>`;
    restoredHtml = restoredHtml.replace(placeholder, wrappedMath);
  }

  return restoredHtml;
}
