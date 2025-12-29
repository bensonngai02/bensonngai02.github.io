// Blog index page; edit to change how posts are listed and filtered.
import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../data/posts';
import { TagList } from '../components/Tag';
import BlogFontToggle from '../components/BlogFontToggle';

function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="section section-wrapper blog-font-scope" style={{ marginTop: '24px' }}>
      <section className="content-section">
        <div className="blog-header-top" style={{ justifyContent: 'space-between' }}>
          <Link to="/#about">← Back</Link>
          <BlogFontToggle />
        </div>
        <div className="section-header">
          <div>
            <h1>blog</h1>
            <p style={{ marginBottom: '18px' }}>Aiming to review the newest restaurants I've tried, travels, cooking, and more random stuff here.</p>
          </div>
        </div>

        {posts.length === 0 && <p>No posts yet. Add a markdown file in public/blog.</p>}

        <div className="blog-list" style={{ marginTop: '8px' }}>
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="post-row">
              <div className="post-row-main" style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="post-title">
                  {post.title}
                </div>
                <div className="post-date">{post.formattedDate}</div>
              </div>
              <div style={{ marginTop: '2px' }}>
                <TagList tags={post.tags} />
              </div>
            </Link>
          ))}
        </div>
        <div className="blog-font-footer" />
      </section>
    </main>
  );
}

export default BlogIndex;
