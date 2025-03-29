# Life Beyond Fife Blog

A personal tech blog theme built with modern JavaScript, featuring Markdown-based content and client-side routing.

## Project Structure

```
project-root/
├── src/                   # Source code
│   ├── index.js           # Application entry point
│   ├── main.js            # Main initialization
│   ├── index.html         # Main HTML template
│   ├── components/        # UI components
│   ├── utils/             # Utility functions
│   ├── styles/            # CSS styles
│   │   ├── main.css       # Main stylesheet
│   │   ├── additional.css # Additional page styles
│   │   ├── markdown.css   # Markdown content styles
│   │   └── pagination.css # Pagination styles
│   ├── js/                # JavaScript modules
│   │   ├── blog.js        # Blog functionality & pagination
│   │   ├── router.js      # Client-side routing
│   │   └── post-loader.js # Post loading and markdown processing
│   ├── pages/             # Page templates
│   │   ├── about.js       # About page
│   │   ├── categories.js  # Categories page
│   │   └── post-detail.js # Blog post detail
│   ├── posts/             # Markdown blog posts
│   │   └── *.md           # Individual blog post files
│   └── images/            # Blog images
├── dist/                  # Build output (generated)
├── webpack.config.js      # Webpack configuration
├── package.json           # Dependencies and scripts
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## Features

- **Markdown Content**: Write blog posts in Markdown with YAML front matter
- **SEO-Friendly URLs**: Clean URLs for posts, categories, and pages
- **Pagination**: Server-style pagination with `/page/2` URL format
- **Categories & Tags**: Organize posts with categories and tags
- **Responsive Design**: Mobile-optimized layout
- **Client-Side Routing**: Smooth navigation without page reloads
- **Code Splitting**: Optimized bundle loading for better performance
- **Image Support**: Display images referenced in Markdown posts

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository
   ```bash
   git clone https://github.com/lifebeyondfife/blog.git
   cd blog
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

The blog will be available at http://localhost:9000

### Building for Production

```bash
npm run build
# or
yarn build
```

The compiled files will be in the `dist` directory.

## Writing Blog Posts

Blog posts are written in Markdown and stored in the `src/posts/` directory. Each post should include YAML front matter at the top of the file.

Example post:

```markdown
---
title: "My Blog Post Title"
date: "2023-08-15"
categories: 
  - "travel"
  - "photography"
tags:
  - "mountains"
  - "hiking"
---

# Heading 1

This is the content of my blog post. You can use **bold**, *italic*, and other Markdown formatting.

![Image description](/images/my-image.jpg)

## Heading 2

More content...
```

## URL Structure

- Home page: `/`
- Pagination: `/page/2`, `/page/3`, etc.
- Post detail: `/post/post-slug`
- Categories: `/category/category-name`
- Tags: `/tag/tag-name`
- Static pages: `/about`, `/categories`

## Customization

### Changing the Theme Colors

The main color scheme is defined in CSS variables in `src/styles/main.css`. You can easily customize the theme by modifying these variables:

```css
:root {
  --primary-color: #0483ae;       /* Medium-bright blue for hyperlinks */
  --secondary-color: #5c899e;     /* Blue-gray */
  --accent-color: #58acfa;        /* Light blue */
  /* Other color variables... */
}
```

### Site Configuration

Site title, description, and other global settings can be found in the HTML template and JavaScript files.

