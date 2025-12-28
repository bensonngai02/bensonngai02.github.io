// Reusable tag pill with optional icon mapping or emoji fallback.
import React from 'react';
import { tagIcons, tagEmoji } from '../data/tagIcons';

function normalize(label = '') {
  return label
    .trim()
    .toLowerCase()
    .replace(/\+\+/g, 'pp')
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function Tag({ label }) {
  if (!label) return null;
  const key = normalize(label);
  const iconSrc = tagIcons[key];
  const emoji = tagEmoji[key];
  const fallback = emoji || label.trim()[0] || '';

  return (
    <span className="tech-tag">
      {iconSrc ? (
        <img src={iconSrc} alt={label} className="tag-icon-img" />
      ) : (
        <span className="tech-icon">{fallback}</span>
      )}
      {label}
    </span>
  );
}

export function TagList({ tags, after }) {
  const hasTags = Array.isArray(tags) && tags.length > 0;
  if (!hasTags && !after) return null;
  return (
    <div className="tech-tags inline">
      {hasTags &&
        tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      {after}
    </div>
  );
}

export default Tag;
