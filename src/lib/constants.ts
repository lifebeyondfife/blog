export const SITE_CONFIG = {
  title: 'Life Beyond Fife',
  description: 'Engineering from the glorious Kingdom',
  byline: 'I love hacking together code to make awesome things; mainly I love sharing what\'s worked for me.',
  author: 'Iain McDonald',
  siteUrl: 'https://lifebeyondfife.com',
  postsPerPage: 6,
  avatar: '/images/originals/me.jpg',
  bio: 'Engineering leader, writer, and creator.',
  social: {
    github: 'https://github.com/lifebeyondfife',
    linkedin: 'https://www.linkedin.com/in/iain-m-mcdonald/',
  },
} as const;

export const POSTS_DIRECTORY = 'content/posts';
export const IMAGES_DIRECTORY = 'public/images';
export const GENERATED_DIRECTORY = 'generated';
export const EXCERPT_WORD_COUNT = 100;

export const READING_TIME_CONFIG = {
  wordsPerMinute: 200,
  includeImages: true,
  imageReadingTime: 12,
} as const;

export const DATE_FORMAT = {
  full: 'dd MMMM yyyy',
  short: 'dd MMM yyyy',
  iso: 'yyyy-MM-dd',
} as const;

export const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
] as const;

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/lifebeyondfife',
    icon: 'GitHub',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/iain-m-mcdonald/',
    icon: 'LinkedIn',
  },
  {
    name: 'RSS',
    href: '/rss.xml',
    icon: 'Rss',
  },
] as const;

export const SEO_CONFIG = {
  defaultTitle: SITE_CONFIG.title,
  titleTemplate: `%s | ${SITE_CONFIG.title}`,
  defaultDescription: SITE_CONFIG.description,
  defaultKeywords: ['blog', 'tech', 'leadership', 'software engineering', 'engineering culture'],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.title,
    images: [
      {
        url: `${SITE_CONFIG.siteUrl}/${IMAGES_DIRECTORY}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
  },
} as const;

export const CODE_THEME = {
  light: 'github-light',
  dark: 'github-dark',
} as const;

export const ERROR_MESSAGES = {
  postNotFound: 'Post not found',
  loadError: 'Failed to load content',
  invalidFormat: 'Invalid post format',
} as const;
