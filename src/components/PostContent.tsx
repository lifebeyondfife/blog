interface PostContentProps {
  html: string;
}

export default function PostContent({ html }: PostContentProps) {
  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900
        prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:mb-4 prose-p:leading-relaxed prose-p:text-gray-700
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:font-semibold prose-strong:text-gray-900
        prose-em:text-gray-700
        prose-li:text-gray-700
        prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5
        prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:text-gray-800
        prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300
        prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
        prose-img:rounded-lg prose-img:shadow-md
        [&_p:has(img)]:text-center [&_p:has(picture)]:text-center
        [&_picture]:inline-block [&_img]:inline-block
        prose-ul:my-4 prose-ol:my-4
        prose-li:my-2
        prose-table:border-collapse
        prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50
        prose-th:px-4 prose-th:py-2
        prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2
        prose-hr:my-8 prose-hr:border-gray-300"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
