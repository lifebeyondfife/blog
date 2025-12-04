import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeOptimisedImages from '@/lib/rehype-optimised-images';
import matter from 'gray-matter';

export interface Frontmatter {
  [key: string]: any;
}

export interface ParsedMarkdown {
  frontmatter: Frontmatter;
  content: string;
  excerpt?: string;
}

export function parseFrontmatter(source: string): ParsedMarkdown {
  const { data, content, excerpt } = matter(source, {
    excerpt: true,
    excerpt_separator: '<!-- more -->'
  });

  return {
    frontmatter: data,
    content: content.trim(),
    excerpt: excerpt?.trim()
  };
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] })
    .use(rehypeOptimisedImages)
    .use(rehypeStringify);

  const file = await processor.process(markdown);
  return String(file);
}

export async function parseMarkdown(
  source: string
): Promise<ParsedMarkdown & { htmlContent: string }> {
  const parsed = parseFrontmatter(source);
  const htmlContent = await markdownToHtml(parsed.content);

  return {
    ...parsed,
    htmlContent
  };
}

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\n{2,}/g, '\n')
    .trim();
}
