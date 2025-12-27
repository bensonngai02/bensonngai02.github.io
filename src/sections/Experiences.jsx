// Experiences section; all content comes from src/data/experiences.js.
import React, { useRef, useState } from 'react';
import { experiences } from '../data/experiences';
import { TagList } from '../components/Tag';
import MediaGallery from '../components/MediaGallery';
import { renderTextWithLinks } from '../utils/text';

function ExperienceDetails({ item, isOpen, contentHeight, setRef }) {
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
                {entry.emoji && <span className="emoji">{entry.emoji}</span>} {renderTextWithLinks(entry)}
              </p>
            ))}
            <TagList tags={item.tags} />
          </div>
          <MediaGallery media={item.media} title={item.company} />
        </div>
    </div>
  );
}

function Experiences() {
  const [expanded, setExpanded] = useState(null);
  const detailRefs = useRef({});

  const toggle = (company) => {
    setExpanded((prev) => (prev === company ? null : company));
  };

  return (
    <section id="experiences" className="section-wrapper experiences-section">
      <section className="content-section">
        <h1 style={{ textAlign: 'left' }}>experiences</h1>
        <div className="experience-list">
          {experiences.filter((e) => !e.archived).map((item) => {
            const isOpen = expanded === item.company;
            const setRef = (el) => {
              if (el) detailRefs.current[item.company] = el;
            };
            const contentHeight = detailRefs.current[item.company]?.scrollHeight || 0;

            return (
              <div
                key={item.company}
                className={`experience-row ${isOpen ? 'open' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => toggle(item.company)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(item.company);
                  }
                }}
              >
                <div className="experience-row-main">
                  <span className="logo-box">
                    <img src={item.logo} alt={item.company} />
                  </span>
                  <div className="experience-row-text">
                    <div className="experience-title">
                      {item.company} <span className="job-title-inline">{item.role}</span>
                    </div>
                    <div className="experience-meta">{item.location || ''}</div>
                  </div>
                </div>
                <div className="experience-period">{item.period}</div>
                <ExperienceDetails
                  item={item}
                  isOpen={isOpen}
                  contentHeight={contentHeight}
                  setRef={setRef}
                />
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default Experiences;
