// Blog section on home; edit to change how posts are listed in the home view.
import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../data/posts';
import { TagList } from '../components/Tag';

function Blog() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <section className="section-wrapper writing-section" id="blog">
      <section className="content-section">
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <h1>blog</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to="/blog">view all</Link>
          </div>
        </div>
        <div className="blog-list">
          {posts.map((post, idx) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="post-row">
              <div className="post-row-main" style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="post-title">
                  {post.title}
                </div>
                <div className="post-date">{post.formattedDate}</div>
              </div>
              <div style={{ marginTop: '0px' }}>
                <TagList tags={post.tags} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Blog;
