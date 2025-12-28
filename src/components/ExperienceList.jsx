// Reusable expandable list used for experiences-style rows (experiences/programs).
import React, { useRef, useState } from 'react';
import { TagList } from './Tag';
import { tagIcons } from '../data/tagIcons';
import MediaGallery from './MediaGallery';
import { renderTextWithLinks } from '../utils/text';

function ExperienceDetails({ item, isOpen, contentHeight, setRef, titleText }) {
  const githubTag = item.github ? (
    <a
      className="tech-tag github-pill"
      href={item.github}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={tagIcons.github || '/assets/about/github-white.png'} alt="GitHub" className="tag-icon-img" />
      GitHub
    </a>
  ) : null;

  return (
    <div
      className="experience-details"
      ref={setRef}
      style={{
        maxHeight: isOpen ? `${contentHeight}px` : '0px',
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div className="experience-detail-body">
        <div className="experience-detail-text">
          {(item.expanded || []).map((entry, idx) => (
            <p key={idx} className="experience-summary">
              {entry.emoji && <span className="emoji">{entry.emoji}</span>}{' '}
              {renderTextWithLinks(entry)}
            </p>
          ))}
          <TagList tags={item.tags} after={githubTag} />
        </div>
        <MediaGallery media={item.media} title={titleText} />
      </div>
    </div>
  );
}

function parseYear(value = '') {
  // Extracts the first 4-digit year or handles 'now'/'present' as max.
  const lower = String(value).toLowerCase();
  if (lower.includes('now') || lower.includes('present') || lower.includes('currently')) return 9999;
  const match = String(value).match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

export default function ExperienceList({
  items = [],
  id = 'experiences',
  title = 'experiences',
  sectionClassName = 'experiences-section',
}) {
  const [expanded, setExpanded] = useState(null);
  const detailRefs = useRef({});
  const filtered = (items || [])
    .filter((i) => !i.archived)
    .sort((a, b) => parseYear(b.dates || b.period) - parseYear(a.dates || a.period));

  const toggle = (key) => {
    setExpanded((prev) => (prev === key ? null : key));
  };

  return (
    <section id={id} className={`section-wrapper ${sectionClassName}`}>
      <section className="content-section">
        <h1 style={{ textAlign: 'left' }}>{title}</h1>
        <div className="experience-list">
          {filtered.map((item) => {
            const titleText = item.company || item.name;
            const key = titleText;
            const isOpen = expanded === key;
            const setRef = (el) => {
              if (el) detailRefs.current[key] = el;
            };
            const contentHeight = detailRefs.current[key]?.scrollHeight || 0;

            return (
              <div
                key={key}
                className={`experience-row ${isOpen ? 'open' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => toggle(key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(key);
                  }
                }}
              >
                <div className="experience-row-main">
                  <span className="logo-box">
                    {item.logo ? (
                      <img src={item.logo} alt={titleText} />
                    ) : (
                      <span aria-hidden="true" style={{ fontSize: '28px', lineHeight: 1 }}>
                        {item.icon || '📌'}
                      </span>
                    )}
                  </span>
                  <div className="experience-row-text">
                    <div className="experience-title">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {titleText}
                        </a>
                      ) : (
                        titleText
                      )}
                      {item.role && <span className="job-title-inline">{item.role}</span>}
                    </div>
                    {item.summary && <div className="experience-meta">{renderTextWithLinks(item.summary)}</div>}
                    <div className="experience-meta">{item.location || ''}</div>
                  </div>
                </div>
                <div className="experience-period">{item.dates}</div>
                <ExperienceDetails
                  item={item}
                  isOpen={isOpen}
                  contentHeight={contentHeight}
                  setRef={setRef}
                  titleText={titleText}
                />
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
