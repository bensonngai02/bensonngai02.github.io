// About section content; driven by src/data/about.js. Edit that file to change bio text and social links.
import React from 'react';
import { aboutContent } from '../data/about';

function renderParagraph(text, links = []) {
  if (!text) return null;
  const map = {};
  links.forEach((l) => {
    if (l.label) map[l.label.toLowerCase()] = l;
  });
  const segments = text.split(/\[(.+?)\]/); // keep content inside []
  return segments.map((seg, idx) => {
    if (idx % 2 === 0) {
      return seg;
    }
    const link = map[seg.toLowerCase()];
    if (link) {
      return (
        <a key={`${seg}-${idx}`} className="buzzword linkable" href={link.href}>
          {link.label}
        </a>
      );
    }
    return (
      <span key={`${seg}-${idx}`} className="buzzword">
        {seg}
      </span>
    );
  });
}

function About() {
  const { greetingEmoji, heading, paragraphs, socials } = aboutContent;

  return (
    <section id="about" className="section-wrapper">
      <section className="about-section">
        <section className="columns">
          <div className="profile-column">
            <div className="circle-cutout" />
          </div>

          <div>
            <div className="icon-and-text">
              <h1>
                <span className="emoji wave" style={{ fontSize: '28px' }}>
                  {greetingEmoji}
                </span>
              </h1>
              <h1 style={{ marginTop: '2px' }}>{heading}</h1>
            </div>
            {paragraphs.map((para, idx) => (
              <p key={idx}>{renderParagraph(para.text, para.links)}</p>
            ))}

            <div className="icon-wrapper">
              {socials.map((s) => (
                <a key={s.label} className="icon" href={s.href}>
                  <img src={s.icon} alt={s.label} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default About;
