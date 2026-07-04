// ================================================================
// BLOG REGISTRY — How to add a new blog post:
//
// 1. Create: src/data/blogs/blog-4-my-topic.js  (copy any existing one)
// 2. Edit the `meta` object (title, date, tags, coverImage, excerpt)
// 3. Write your content in the `content` template literal (Markdown)
// 4. Add the import + spread below (2 lines)
// 5. git add . && git commit -m "Add new blog post" && git push
//    → Vercel auto-deploys in ~60 seconds ✅
// ================================================================

import * as blog1 from './blog-1-deep-rl.js';
import * as blog2 from './blog-2-llm-agents.js';
import * as blog3 from './blog-3-federated-learning.js';
// ADD NEW BLOG IMPORTS HERE ↓
// import * as blog4 from './blog-4-my-new-post.js';

// Newest posts first — reorder this array to change display order
export const blogs = [
  { ...blog1.meta, content: blog1.content },
  { ...blog2.meta, content: blog2.content },
  { ...blog3.meta, content: blog3.content },
  // ADD NEW BLOGS HERE ↓
  // { ...blog4.meta, content: blog4.content },
];

export default blogs;
