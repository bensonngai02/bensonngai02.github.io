// Renders a gallery of images/videos with optional size presets.
import React from 'react';

const SIZE_MAP = { small: 240, medium: 360, large: 480 };
const SIZE_MAP_PORTRAIT = { small: 180, medium: 240, large: 320 };

function normalize(items = []) {
  return items.map((m) => (typeof m === 'string' ? { src: m } : m));
}

function MediaItem({ src, size = 'medium', title, orientation = 'landscape' }) {
  const isVideo = src.toLowerCase().endsWith('.mp4') || src.toLowerCase().includes('youtube.com');
  const widthPx =
    orientation === 'portrait'
      ? (SIZE_MAP_PORTRAIT[size] || SIZE_MAP_PORTRAIT.medium)
      : (SIZE_MAP[size] || SIZE_MAP.medium);
  const width = `${widthPx}px`;
  const aspect = orientation === 'portrait' ? '9 / 16' : '16 / 9';
  const iframeHeight = orientation === 'portrait' ? Math.round((widthPx * 16) / 9) : '180';

  if (isVideo && src.includes('youtube.com')) {
    return (
      <div
        className="rectangle-image"
        style={{ maxWidth: width, width: '100%', aspectRatio: aspect, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          width="100%"
          height={iframeHeight}
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
      style={{ maxWidth: width, width: '100%', aspectRatio: aspect, overflow: 'hidden' }}
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
