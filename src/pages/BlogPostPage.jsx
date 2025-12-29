// Blog post detail page; edit to change post layout or metadata display.
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../data/posts';
import { TagList } from '../components/Tag';
import BlogFontToggle from '../components/BlogFontToggle';

const SIZE_MAP = {
  xxs: '15%',
  xs: '20%',
  s: '30%',
  m: '45%',
  l: '60%',
  xl: '75%',
  xxl: '90%',
  full: '100%',
};

function parseImageMeta(title = '') {
  const meta = { size: 'm', align: '' };
  if (!title) return meta;
  
  // Parse all key=value pairs, handling quoted and unquoted values
  const pairs = [];
  
  // First, extract quoted pairs
  const quotedPattern = /(\w+)=(['"])([^'"]*)\2/g;
  let match;
  while ((match = quotedPattern.exec(title)) !== null) {
    pairs.push({ key: match[1].toLowerCase(), value: match[3] });
  }
  
  // Then extract unquoted pairs (remove quoted ones first to avoid duplication)
  const withoutQuoted = title.replace(quotedPattern, '');
  const unquotedPattern = /(\w+)=([^\s'"]+)/g;
  while ((match = unquotedPattern.exec(withoutQuoted)) !== null) {
    pairs.push({ key: match[1].toLowerCase(), value: match[2] });
  }
  
  // Apply parsed values
  pairs.forEach(({ key, value }) => {
    if (key === 'size') meta.size = value;
    if (key === 'align') meta.align = value;
  });
  
  return meta;
}

function ImageRenderer({ src, alt, title }) {
  const meta = parseImageMeta(title);
  const width = SIZE_MAP[meta.size] || SIZE_MAP.m;

  // Container style for the wrapper
  let containerStyle = {
    display: 'inline-block',
    verticalAlign: 'top',
    margin: '0 4px 8px 0',
    maxWidth: width,
  };

  // Apply alignment to container
  if (meta.align === 'center') {
    containerStyle.margin = '0 auto 8px auto';
    containerStyle.display = 'block';
  } else if (meta.align === 'left') {
    containerStyle.marginRight = '4px';
    containerStyle.marginLeft = '0';
  } else if (meta.align === 'right') {
    containerStyle.marginLeft = '4px';
    containerStyle.marginRight = '0';
  }

  return (
    <span style={containerStyle}>
      <img
        src={src}
        alt={alt}
        style={{ 
          width: '100%',
          borderRadius: '10px',
          display: 'block',
          height: 'auto'
        }}
      />
    </span>
  );
}

function LinkRenderer({ href, children, title }) {
  const isBuzz = title && title.toLowerCase().includes('buzz');
  return (
    <a
      href={href}
      className={isBuzz ? 'buzzword linkable' : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

// Helper to extract text content from React children
function extractText(node) {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node && typeof node === 'object' && node.props && node.props.children) {
    return extractText(node.props.children);
  }
  return '';
}

// Helper to remove alignment prefix from children
function removeAlignmentPrefix(children) {
  if (!children) return { children, alignment: null };
  
  const childrenArray = Array.isArray(children) ? children : [children];
  const fullText = extractText(children);
  const match = fullText.match(/^\\(left|center|right)\s*/);
  
  if (!match) return { children, alignment: null };
  
  const alignment = match[1];
  const prefixLength = match[0].length;
  
  // Remove prefix from first text node
  const processNode = (node, remaining) => {
    if (remaining <= 0) return node;
    
    if (typeof node === 'string') {
      const result = node.substring(remaining);
      return result;
    }
    
    if (Array.isArray(node)) {
      const result = [];
      let leftToRemove = remaining;
      
      for (const child of node) {
        if (leftToRemove <= 0) {
          result.push(child);
          continue;
        }
        
        if (typeof child === 'string') {
          const childLength = child.length;
          if (childLength <= leftToRemove) {
            leftToRemove -= childLength;
          } else {
            result.push(child.substring(leftToRemove));
            leftToRemove = 0;
          }
        } else {
          const processed = processNode(child, leftToRemove);
          if (processed) result.push(processed);
          leftToRemove = 0;
        }
      }
      
      return result;
    }
    
    if (node && typeof node === 'object' && node.props) {
      const newChildren = processNode(node.props.children, remaining);
      return React.cloneElement(node, {
        ...node.props,
        children: newChildren
      });
    }
    
    return node;
  };
  
  const newChildren = processNode(childrenArray, prefixLength);
  return { children: newChildren, alignment };
}

function ParagraphRenderer({ children }) {
  const { children: processedChildren, alignment } = removeAlignmentPrefix(children);
  
  const style = {};
  if (alignment) {
    style.textAlign = alignment;
  }
  
  // Check if paragraph contains only images (for proper spacing)
  const childArray = Array.isArray(processedChildren) ? processedChildren : [processedChildren];
  const hasOnlyImages = childArray.every(child => {
    if (!child) return true;
    if (typeof child === 'string' && !child.trim()) return true;
    if (typeof child === 'object' && child.type === 'span') {
      // Check if it's an image wrapper from ImageRenderer
      return true;
    }
    return false;
  });
  
  if (hasOnlyImages) {
    style.fontSize = 0; // Removes whitespace between inline-block elements
    style.lineHeight = 0;
  }
  
  return <p style={style}>{processedChildren}</p>;
}

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
        <div className="blog-header-top" style={{ justifyContent: 'space-between' }}>
          <Link to="/blog">← Back</Link>
          <BlogFontToggle />
        </div>
        <div className="section-header" style={{ alignItems: 'flex-start' }}>
          <div>
            <p className="eyebrow">
              {post.formattedDate} • {post.readTime} min read
            </p>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <TagList tags={post.tags} />
          </div>
        )}

        <article className="markdown-body post-body">
          <ReactMarkdown
            components={{
              img: ImageRenderer,
              a: LinkRenderer,
              p: ParagraphRenderer,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
        <div className="blog-font-footer" />
      </section>
    </main>
  );
}

export default BlogPostPage;
