import { markdownToHtml } from '@/lib/markdown';

interface PostContentProps {
  content: string;
}

export default async function PostContent({ content }: PostContentProps) {
  const htmlContent = await markdownToHtml(content);

  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:mb-4 prose-p:leading-relaxed
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        dark:prose-a:text-blue-400
        prose-strong:font-semibold prose-strong:text-gray-900
        dark:prose-strong:text-gray-100
        prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5
        prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        dark:prose-code:bg-gray-800
        prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200
        dark:prose-pre:bg-gray-900 dark:prose-pre:border-gray-700
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300
        prose-blockquote:pl-4 prose-blockquote:italic
        dark:prose-blockquote:border-gray-600
        prose-img:rounded-lg prose-img:shadow-md
        prose-ul:my-4 prose-ol:my-4
        prose-li:my-2
        prose-table:border-collapse
        prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50
        prose-th:px-4 prose-th:py-2
        dark:prose-th:border-gray-700 dark:prose-th:bg-gray-800
        prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2
        dark:prose-td:border-gray-700
        prose-hr:my-8 prose-hr:border-gray-300
        dark:prose-hr:border-gray-700"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
