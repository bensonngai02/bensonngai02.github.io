// Blog font toggle used on blog pages; switches between sans and serif.
import React, { useEffect, useState } from 'react';

const FONT_MAP = {
  sans: '"Inter", "Helvetica Neue", Arial, sans-serif',
  serif: '"Libre Baskerville", serif',
};

function safeGet(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

function BlogFontToggle() {
  const [choice, setChoice] = useState(() => safeGet('blog-font-choice', 'sans'));

  useEffect(() => {
    const font = FONT_MAP[choice] || FONT_MAP.sans;
    document.documentElement.style.setProperty('--blog-font', font);
    safeSet('blog-font-choice', choice);
  }, [choice]);

  return (
    <div className="blog-font-toggle">
      <button
        type="button"
        className={choice === 'sans' ? 'active' : ''}
        onClick={() => setChoice('sans')}
        aria-pressed={choice === 'sans'}
      >
        sans
      </button>
      <button
        type="button"
        className={choice === 'serif' ? 'active' : ''}
        onClick={() => setChoice('serif')}
        aria-pressed={choice === 'serif'}
      >
        serif
      </button>
    </div>
  );
}

export default BlogFontToggle;
