// Utility to render text with [buzzword] links using provided link metadata.
import React from 'react';

export function renderTextWithLinks(entry, linksOverride) {
  const isString = typeof entry === 'string';
  const text = isString ? entry : entry.text || '';
  const links = linksOverride || (isString ? [] : entry.links || []);
  if (!text) return null;
  if (!links || links.length === 0) return text;

  const map = {};
  links.forEach((l) => {
    if (l.label) map[l.label.toLowerCase()] = l;
  });

  const segments = text.split(/\[(.+?)\]/);
  return segments.map((seg, idx) => {
    if (idx % 2 === 0) return seg;
    const link = map[seg.toLowerCase()];
    if (!link) return seg;
    return (
      <a
        key={`${seg}-${idx}`}
        href={link.href}
        className={link.buzzword ? 'buzzword linkable' : 'linkable'}
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginLeft: '4px', marginRight: '4px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {link.label}
      </a>
    );
  });
}
