// Life section; all content comes from src/data/life.js.
import React from 'react';
import { favorites, facts, recents, lastUpdated } from '../data/life';

function Life() {
  const recentDisplay = recents.map((r) => ({
    key: r.label.toLowerCase(),
    emoji: r.emoji || '',
    pillClass: 'pill-cream',
    value: r.value || '',
  }));

  return (
    <section id="life" className="section-wrapper">
      <section className="content-section">
        <h1 style={{ textAlign: 'left', marginBottom: '12px' }}>life</h1>
        <div className="life-grid">
          <div className="life-card" style={{ background: 'bisque' }}>
            <div className="life-card-title">recently</div>
            {lastUpdated && (
              <p className="recent-updated" style={{ margin: 0, padding: 0, marginBottom: 12 }}>
                last updated: {lastUpdated}
              </p>
            )}
            <div className="life-list">
              {recentDisplay.map((item) => (
                <p key={item.key} className="recent-row">
                  <span className="emoji">{item.emoji}</span>{' '}
                  <span className="favorite-pill pill-cream recent-key">{item.key}</span>{' '}
                  <span>{item.value}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="life-card">
            <div className="life-card-title">favorites</div>
            <div className="life-list">
              {favorites.map((fav) => (
                <p key={fav.label}>
                  <span className={`favorite-pill pill-${fav.color || 'blue'}`}>
                    {fav.emoji ? `${fav.emoji} ` : ''}
                    {fav.label}
                  </span>{' '}
                  {fav.value}
                </p>
              ))}
            </div>
          </div>

          <div className="life-card">
            <div className="life-card-title">fun facts</div>
            <div className="life-list">
              {facts.map((fact, idx) => (
                <p key={idx}>
                  {idx === 0 && <span className="emoji">&#49;&#65039;&#8419;</span>}
                  {idx === 1 && <span className="emoji">&#50;&#65039;&#8419;</span>}
                  {idx === 2 && <span className="emoji">&#51;&#65039;&#8419;</span>}
                  {idx > 2 && <span className="emoji">&#8226;</span>}{' '}
                  {fact}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Life;
