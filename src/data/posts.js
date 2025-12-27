// Blog post loader; parses markdown posts and exposes helpers for listing and lookup.
import { Buffer } from 'buffer';
import matter from 'gray-matter';

// gray-matter expects Buffer in browser builds; polyfill from buffer package.
if (typeof globalThis !== 'undefined' && !globalThis.Buffer) {
  globalThis.Buffer = Buffer;
}

const files = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const WORDS_PER_MINUTE = 200;

function normalizeDate(dateInput) {
  const parsed = new Date(dateInput);
  if (Number.isNaN(parsed.getTime())) {
    return new Date();
  }
  return parsed;
}

function formatDate(dateInput) {
  return normalizeDate(dateInput).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function estimateReadTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const posts = Object.entries(files)
  .map(([path, raw]) => {
    const { data, content } = matter(raw);
    const slug = path.replace('../posts/', '').replace('.md', '');
    const date = normalizeDate(data.date || new Date());

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date,
      formattedDate: formatDate(date),
      tags: data.tags || [],
      content,
      readTime: estimateReadTime(content),
    };
  })
  .sort((a, b) => b.date - a.date);

export function getAllPosts() {
  return posts;
}

export function getLatestPosts(count = 2) {
  return posts.slice(0, count);
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}
