// Blog post detail page; edit to change post layout or metadata display.
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../data/posts';
import { TagList } from '../components/Tag';
import BlogFontToggle from '../components/BlogFontToggle';

function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="section blog-font-scope">
        <p>Post not found.</p>
        <Link to="/blog">← Back</Link>
      </main>
    );
  }

  return (
    <main className="section blog-font-scope">
      <section className="content-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">
              {post.formattedDate} • {post.readTime} min read
            </p>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
          </div>
          <Link to="/blog">← Back</Link>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <TagList tags={post.tags} />
          </div>
        )}

        <article className="markdown-body post-body">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
        <div className="blog-font-footer">
          <BlogFontToggle />
        </div>
      </section>
    </main>
  );
}

export default BlogPostPage;
