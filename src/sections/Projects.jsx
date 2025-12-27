// Projects section; data-driven like experiences. Content comes from src/data/projects.js.
import React, { useRef, useState } from 'react';
import { projects } from '../data/projects';
import { TagList } from '../components/Tag';
import MediaGallery from '../components/MediaGallery';
import { renderTextWithLinks } from '../utils/text';

function Projects() {
  const [expanded, setExpanded] = useState(null);
  const detailRefs = useRef({});

  const toggle = (name) => {
    setExpanded((prev) => (prev === name ? null : name));
  };

  return (
    <section id="projects" className="section-wrapper projects-section">
      <section className="content-section">
        <h1 style={{ textAlign: 'left' }}>projects</h1>
        <div className="experience-list">
          {projects.filter((p) => !p.archived).map((item) => {
            const isOpen = expanded === item.name;
            const setRef = (el) => {
              if (el) detailRefs.current[item.name] = el;
            };
            const contentHeight = detailRefs.current[item.name]?.scrollHeight || 0;
            return (
              <div
                key={item.name}
                className={`experience-row ${isOpen ? 'open' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => toggle(item.name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(item.name);
                  }
                }}
              >
                <div className="experience-row-main">
                  <span className="logo-box" style={{ fontSize: '28px', justifyContent: 'center', lineHeight: 1 }}>
                    <span aria-hidden="true">{item.icon || '📌'}</span>
                  </span>
                  <div className="experience-row-text">
                    <div className="experience-title" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span>{item.name}</span>
                      {item.summary && (
                        <span
                          className="job-title-inline"
                          style={{ marginLeft: 0, display: 'block' }}
                        >
                          {renderTextWithLinks(item.summary, item.summaryLinks)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="experience-period">{item.period || ''}</div>

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
                      {(item.details || []).map((line, idx) => {
                        const text = typeof line === 'string' ? line : line.text;
                        const links = typeof line === 'string' ? [] : line.links || [];
                        return (
                          <p key={idx} className="experience-summary">
                            {renderTextWithLinks(text, links)}
                          </p>
                        );
                      })}
                      {item.tags && item.tags.length > 0 && <TagList tags={item.tags} />}
                    </div>
                    <MediaGallery media={item.media} title={item.name} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default Projects;
