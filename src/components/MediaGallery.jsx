// Renders a gallery of images/videos with optional size presets.
import React from 'react';

const SIZE_MAP = { small: 240, medium: 360, large: 480 };

function normalize(items = []) {
  return items.map((m) => (typeof m === 'string' ? { src: m } : m));
}

function MediaItem({ src, size = 'medium', title }) {
  const isVideo = src.toLowerCase().endsWith('.mp4') || src.toLowerCase().includes('youtube.com');
  const width = `${SIZE_MAP[size] || SIZE_MAP.medium}px`;

  if (isVideo && src.includes('youtube.com')) {
    return (
      <div
        className="rectangle-image"
        style={{ maxWidth: width, width: '100%', aspectRatio: '16 / 9', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          width="100%"
          height="180"
          src={src}
          title={title || 'media'}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className="rectangle-image"
      style={{ maxWidth: width, width: '100%', aspectRatio: '16 / 9', overflow: 'hidden' }}
      onClick={(e) => e.stopPropagation()}
    >
      {isVideo ? (
        <video
          src={src}
          controls
          playsInline
          width="100%"
          height="100%"
          style={{ borderRadius: '12px' }}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <img src={src} alt={title || 'media'} onClick={(e) => e.stopPropagation()} />
      )}
    </div>
  );
}

export default function MediaGallery({ media = [], title }) {
  const items = normalize(media).filter((m) => m?.src);
  if (!items.length) return null;
  return (
    <div className="experience-media">
      {items.map((item) => (
        <MediaItem key={item.src} {...item} title={title} />
      ))}
    </div>
  );
}
