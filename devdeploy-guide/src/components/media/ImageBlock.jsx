import { useMemo, useState } from 'react'

export default function ImageBlock({
  image,
  title,
  caption,
  description,
  stepNumber,
  altText,
  showControls = true,
  allowZoom = true,
}) {
  const [zoom, setZoom] = useState(1)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const safeImage = useMemo(
    () => ({
      src: image?.url || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      alt: altText || image?.altText || title || 'Tutorial image',
    }),
    [image, altText, title],
  )

  const handleAdjustZoom = (direction) => {
    setZoom((current) => {
      const next = direction === 'in' ? current + 0.25 : current - 0.25
      return Math.min(2.5, Math.max(1, Number(next.toFixed(2))))
    })
  }

  return (
    <figure className="media-block">
      {stepNumber && <div className="step-marker">{stepNumber}</div>}
      {title && <figcaption className="media-title">{title}</figcaption>}

      <div className="media-frame">
        <img
          src={safeImage.src}
          alt={safeImage.alt}
          className="media-image"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          onClick={() => setLightboxOpen(true)}
          loading="lazy"
        />
      </div>

      {showControls && allowZoom && (
        <div className="media-controls">
          <button type="button" onClick={() => handleAdjustZoom('in')}>＋</button>
          <button type="button" onClick={() => handleAdjustZoom('out')}>－</button>
          <button type="button" onClick={() => setZoom(1)}>Reset</button>
          <button type="button" onClick={() => setLightboxOpen(true)}>Fullscreen</button>
        </div>
      )}

      {caption && <figcaption className="media-caption">{caption}</figcaption>}
      {description && <p className="media-description">{description}</p>}

      {lightboxOpen && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightbox-close" onClick={() => setLightboxOpen(false)}>
              Close
            </button>
            <div className="lightbox-toolbar">
              <button type="button" onClick={() => handleAdjustZoom('out')}>−</button>
              <button type="button" onClick={() => handleAdjustZoom('in')}>+</button>
              <button type="button" onClick={() => setZoom(1)}>Reset</button>
            </div>
            <img src={safeImage.src} alt={safeImage.alt} style={{ transform: `scale(${zoom})` }} />
            {caption && <p>{caption}</p>}
          </div>
        </div>
      )}
    </figure>
  )
}
