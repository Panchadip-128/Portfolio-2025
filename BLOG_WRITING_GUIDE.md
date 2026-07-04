# ✍️ Blog Writing Guide

Everything you need to know to write and publish a new blog post.

---

## How to Add a New Blog Post (3 Steps)

### Step 1 — Create the blog file

Copy any existing blog file as a template:

```
src/data/blogs/blog-4-your-topic.js
```

Edit the `meta` object at the top:

```js
export const meta = {
  id: 4,                                    // ← Unique number, increment by 1
  title: "Your Blog Title",
  date: "July 2026",                        // ← Month Year format
  readTime: "7 min read",                   // ← Estimate: ~200 words per minute
  coverImage: "/blog-images/my-cover.jpg",  // ← See Step 2 for images
  tags: ["AI", "Research"],                 // ← Up to 4 tags
  excerpt: "One sentence shown on the card listing.",
};
```

Write your content in the `content` template literal — it's **standard Markdown**:

```js
export const content = `
Your blog content here in Markdown.

## Section Heading

Paragraph text. **Bold text**, *italic text*, [links](https://example.com).

- Bullet point
- Another point

\`\`\`python
# Code blocks work perfectly
import numpy as np
\`\`\`

| Column 1 | Column 2 |
|---|---|
| Tables | Work too |

> Blockquotes look great for callouts
`;
```

---

### Step 2 — Add a cover image

Drop your cover image into:

```
public/blog-images/your-image.jpg
```

Then reference it in `meta.coverImage`:

```js
coverImage: "/blog-images/your-image.jpg",
```

**Tips:**
- Recommended size: 1200×630px (16:9 ratio)
- Any image format works: `.jpg`, `.png`, `.webp`
- Keep files under 500KB for fast loading

---

### Step 3 — Register it in the index

Open `src/data/blogs/index.js` and add two lines:

```js
// At the top, add your import:
import * as blog4 from './blog-4-your-topic.js';

// In the blogs array, add your entry:
export const blogs = [
  { ...blog1.meta, content: blog1.content },
  { ...blog2.meta, content: blog2.content },
  { ...blog3.meta, content: blog3.content },
  { ...blog4.meta, content: blog4.content }, // ← Add this line
];
```

---

## Deploy to Vercel

```bash
git add .
git commit -m "Add blog post: Your Blog Title"
git push
```

Vercel automatically triggers a rebuild. **Your post is live in ~60 seconds.** ✅

---

## Markdown Cheatsheet

| Syntax | Result |
|---|---|
| `**text**` | **Bold** |
| `*text*` | *Italic* |
| `## Heading` | Section heading |
| `### Subheading` | Subsection |
| `- item` | Bullet list |
| `1. item` | Numbered list |
| `[text](url)` | Link |
| `` `code` `` | Inline code |
| `> text` | Blockquote |
| `---` | Horizontal rule |
| `\| col1 \| col2 \|` | Table |

---

## File Structure Reference

```
src/
  data/
    blogs/
      index.js                    ← REGISTER NEW BLOGS HERE
      blog-1-deep-rl.js           ← Blog 1 content
      blog-2-llm-agents.js        ← Blog 2 content
      blog-3-federated-learning.js ← Blog 3 content
      blog-4-your-topic.js        ← Your new blog

public/
  blog-images/
    blog-cover-rl.png
    blog-cover-llm.png
    blog-cover-federated.png
    your-image.jpg               ← Drop new cover images here
```
