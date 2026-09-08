import { useMemo, useState } from 'react'
import { getAllTags, getMediaLibrary, searchMedia } from '../services/mediaService'

export default function ImageLibraryPage() {
  const [query, setQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortAsc, setSortAsc] = useState(false)
  const [selectedImageId, setSelectedImageId] = useState(getMediaLibrary()[0]?.id)
  const [library, setLibrary] = useState(getMediaLibrary())
  const [previewImage, setPreviewImage] = useState(null)
  const tags = useMemo(() => getAllTags(), [])

  const filtered = useMemo(() => {
    const base = searchMedia(query)
      .filter((item) => selectedTag === 'all' || item.tags.includes(selectedTag))

    const sorted = [...base]

    sorted.sort((a, b) => {
      const direction = sortAsc ? 1 : -1
      if (sortBy === 'filename') return a.filename.localeCompare(b.filename) * direction
      if (sortBy === 'size') return (a.width * a.height - b.width * b.height) * direction
      return (new Date(a.createdAt) - new Date(b.createdAt)) * direction
    })

    return sorted
  }, [query, selectedTag, sortBy, sortAsc, library])

  const selectedImage = filtered.find((item) => item.id === selectedImageId) || filtered[0] || library[0]

  const handleUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const image = {
      id: `${file.name}-${Date.now()}`,
      filename: file.name,
      url: URL.createObjectURL(file),
      altText: file.name,
      caption: 'Custom uploaded image',
      description: 'User uploaded media asset',
      width: 1200,
      height: 800,
      fileSize: `${Math.round(file.size / 1024)} KB`,
      tags: ['custom'],
      createdAt: new Date().toISOString(),
      annotations: [],
    }

    const next = [image, ...library]
    setLibrary(next)
    setSelectedImageId(image.id)
    setSelectedTag('all')
    event.target.value = ''
  }

  return (
    <main className="page-shell image-library-page">
      <section className="section-block">
        <div className="section-heading">
          <h2>Image Library</h2>
        </div>

        <section className="library-manager">
          <aside className="library-sidebar panel">
            <div className="library-sidebar-heading">
              <span>Library Manager</span>
              <small>{filtered.length} images</small>
            </div>

            <label className="library-filter-label">
              <span>Search</span>
              <input
                className="library-search"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search image library..."
              />
            </label>

            <div className="library-filter-label sort-combo-wrap">
              <span>Sort by</span>
              <select className="library-select sort-select" value={`${sortBy}|${sortAsc ? 'oldest' : 'newest'}`} onChange={(event) => {
                const [nextSortBy, nextOrder] = event.target.value.split('|')
                setSortBy(nextSortBy)
                setSortAsc(nextOrder === 'oldest')
              }}>
                <option value="createdAt|newest">Created date — Newest first ↓</option>
                <option value="createdAt|oldest">Created date — Oldest first ↑</option>
                <option value="filename|newest">Filename — Newest first ↓</option>
                <option value="filename|oldest">Filename — Oldest first ↑</option>
                <option value="size|newest">Image size — Newest first ↓</option>
                <option value="size|oldest">Image size — Oldest first ↑</option>
              </select>
            </div>

            <div className="tag-filter">
              <span className="tag-filter-title">Tags</span>
              <button type="button" className={`tag-filter-button${selectedTag === 'all' ? ' active' : ''}`} onClick={() => setSelectedTag('all')}>All</button>
              {tags.map((tag) => (
                <button type="button" key={tag} className={`tag-filter-button${selectedTag === tag ? ' active' : ''}`} onClick={() => setSelectedTag(tag)}>#{tag}</button>
              ))}
            </div>
          </aside>

          <section className="library-content">
            <div className="library-grid">
              {filtered.map((item) => (
                <article key={item.id} className={`panel image-library-card${selectedImage?.id === item.id ? ' selected' : ''}`} onClick={() => {
                  setSelectedImageId(item.id)
                  setPreviewImage(item)
                }}>
                  <img src={item.url} alt={item.altText} className="library-thumb" />
                  <div className="image-card-head">
                    <h3>{item.filename}</h3>
                    <span className="image-size-badge">{item.width}×{item.height}</span>
                  </div>
                  <p>{item.caption}</p>
                  <small>{item.fileSize} • {item.createdAt}</small>
                  <div className="tag-list">
                    {item.tags.map((tag) => <span key={tag} className="tag-pill">#{tag}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        {previewImage && (
          <div className="lightbox" onClick={() => setPreviewImage(null)}>
            <div className="lightbox-content image-preview-panel" onClick={(event) => event.stopPropagation()}>
              <div className="lightbox-toolbar">
                <span className="lightbox-title">Preview asset</span>
                <button type="button" className="lightbox-close" onClick={() => setPreviewImage(null)} aria-label="Close preview">×</button>
              </div>
              <img src={previewImage.url} alt={previewImage.altText} className="preview-image" />
              <div className="preview-copy">
                <h3>{previewImage.filename}</h3>
                <p>{previewImage.caption}</p>
                <div className="tag-list">
                  {previewImage.tags.map((tag) => <span key={tag} className="tag-pill">#{tag}</span>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
