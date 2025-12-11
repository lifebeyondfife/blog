'use client';

import Script from 'next/script';

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
      startup?: {
        promise: Promise<void>;
      };
    };
  }
}

export function MathJaxProvider() {
  return (
    <>
      <Script
        id="mathjax-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.MathJax = {
              tex: {
                inlineMath: [['\\\\(', '\\\\)']],
                displayMath: [['\\\\[', '\\\\]']],
                processEscapes: false,
                processEnvironments: true
              },
              options: {
                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
              },
              svg: {
                fontCache: 'global'
              }
            };
          `,
        }}
      />
      <Script
        id="mathjax-script"
        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
