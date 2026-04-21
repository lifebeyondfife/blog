import { Fragment } from 'react';
import SierpinskiWidget from './SierpinskiWidget';

interface PostContentProps {
  html: string;
}

const PROSE_CLASSES = `prose prose-lg dark:prose-invert max-w-none
  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-horizon
  prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
  prose-p:mb-4 prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-cloud-grey
  prose-a:text-blue-600 dark:prose-a:text-sky-blue prose-a:no-underline hover:prose-a:underline
  prose-strong:font-semibold prose-strong:text-gray-900 dark:prose-strong:text-horizon
  prose-em:text-gray-700 dark:prose-em:text-cloud-grey
  prose-li:text-gray-700 dark:prose-li:text-cloud-grey
  prose-code:text-sm prose-code:bg-gray-100 dark:prose-code:bg-ocean-slate prose-code:px-1 prose-code:py-0.5
  prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:text-gray-800 dark:prose-code:text-horizon
  prose-pre:bg-gray-100 dark:prose-pre:bg-ocean-slate prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-ocean-steel
  prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-ocean-steel
  prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-cloud-grey
  prose-img:rounded-lg prose-img:shadow-md
  [&_p:has(img)]:text-center [&_p:has(picture)]:text-center
  [&_picture]:inline-block [&_img]:inline-block
  prose-ul:my-4 prose-ol:my-4
  prose-li:my-2
  prose-table:border-collapse
  prose-th:border prose-th:border-gray-300 dark:prose-th:border-ocean-steel prose-th:bg-gray-50 dark:prose-th:bg-ocean-slate
  prose-th:px-4 prose-th:py-2
  prose-td:border prose-td:border-gray-300 dark:prose-td:border-ocean-steel prose-td:px-4 prose-td:py-2
  prose-hr:my-8 prose-hr:border-gray-300 dark:prose-hr:border-ocean-steel`;

const SIERPINSKI_PLACEHOLDER = '<div data-widget="sierpinski"></div>';

export default function PostContent({ html }: PostContentProps) {
  if (!html.includes(SIERPINSKI_PLACEHOLDER)) {
    return (
      <div
        className={PROSE_CLASSES}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  const segments = html.split(SIERPINSKI_PLACEHOLDER);

  return (
    <div className={PROSE_CLASSES}>
      {segments.map((segment, index) => (
        <Fragment key={index}>
          <div dangerouslySetInnerHTML={{ __html: segment }} />
          {index < segments.length - 1 && <SierpinskiWidget />}
        </Fragment>
      ))}
    </div>
  );
}
