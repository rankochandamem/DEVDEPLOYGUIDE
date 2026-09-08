import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ImageBlock from '../components/media/ImageBlock'
import { categories } from '../data/tutorials'
import { getMediaLibrary } from '../services/mediaService'
import {
  createEmptyTutorial,
  deleteDraft,
  duplicateTutorial,
  exportTutorial,
  getDrafts,
  getPublishedTutorials,
  importTutorial,
  publishTutorial,
  saveDraft,
  saveVersion,
  validateTutorial,
} from '../services/tutorialBuilderService'

const blockTypes = [
  ['text', 'Text'],
  ['heading', 'Heading'],
  ['image', 'Image'],
  ['code', 'Code'],
  ['terminal', 'Terminal command'],
  ['warning', 'Warning'],
  ['tip', 'Tip'],
  ['checklist', 'Checklist'],
  ['quiz', 'Quiz'],
  ['link', 'External link'],
  ['divider', 'Divider'],
]

function newBlock(type) {
  const id = `block-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
  const defaults = {
    text: { id, type, content: 'Write your explanation here.' },
    heading: { id, type, content: 'New section heading' },
    image: { id, type, imageId: getMediaLibrary()[0]?.id || '', caption: '', altText: '' },
    code: { id, type, language: 'bash', title: '', code: '', explanation: '' },
    terminal: { id, type, command: '', explanation: '' },
    warning: { id, type, title: 'Important', content: '', severity: 'warning' },
    tip: { id, type, title: 'Tip', content: '' },
    checklist: { id, type, title: 'Checklist', items: ['Complete this task'] },
    quiz: { id, type, question: '', options: ['Option 1', 'Option 2'], correct: 0, explanation: '' },
    link: { id, type, label: 'Open resource', url: 'https://' },
    divider: { id, type },
  }
  return defaults[type] || defaults.text
}

function PreviewBlock({ block }) {
  if (block.type === 'divider') return <hr />
  if (block.type === 'heading') return <h3>{block.content}</h3>
  if (block.type === 'text') return <p>{block.content}</p>
  if (block.type === 'image') {
    const image = getMediaLibrary().find((item) => item.id === block.imageId)
    return image ? <ImageBlock image={image} caption={block.caption} altText={block.altText || image.altText} /> : <p>No image selected.</p>
  }
  if (block.type === 'code') return <pre className="builder-preview-code">{block.code || 'Code preview'}</pre>
  if (block.type === 'terminal') return <pre className="builder-preview-code">$ {block.command || 'command'}</pre>
  if (block.type === 'checklist') return <div><h4>{block.title}</h4><ul className="checklist">{block.items?.map((item) => <li key={item}>☐ {item}</li>)}</ul></div>
  if (block.type === 'warning' || block.type === 'tip') return <div className={`builder-callout ${block.type}`}><strong>{block.title}</strong><p>{block.content}</p></div>
  if (block.type === 'quiz') return <div className="builder-callout"><strong>{block.question || 'Quiz question'}</strong><ul>{block.options?.map((option) => <li key={option}>{option}</li>)}</ul></div>
  if (block.type === 'link') return <a href={block.url} target="_blank" rel="noreferrer">{block.label}</a>
  return null
}

export default function TutorialBuilderPage() {
  const navigate = useNavigate()
  const [drafts, setDrafts] = useState(() => getDrafts())
  const [published, setPublished] = useState(() => getPublishedTutorials())
  const [editing, setEditing] = useState(null)
  const [activeTab, setActiveTab] = useState('editor')
  const [saveState, setSaveState] = useState('Saved')
  const [validation, setValidation] = useState(null)
  const importInput = useRef(null)

  const media = useMemo(() => getMediaLibrary(), [])

  useEffect(() => {
    if (!editing) return undefined
    setSaveState('Saving...')
    const timer = window.setTimeout(() => {
      saveDraft(editing)
      setDrafts(getDrafts())
      setSaveState('Saved')
    }, 700)
    return () => window.clearTimeout(timer)
  }, [editing])

  const updateTutorial = (field, value) => setEditing((current) => ({ ...current, [field]: value }))

  const updateSection = (sectionIndex, field, value) => setEditing((current) => ({
    ...current,
    sections: current.sections.map((section, index) => index === sectionIndex ? { ...section, [field]: value } : section),
  }))

  const updateBlock = (sectionIndex, blockIndex, changes) => setEditing((current) => ({
    ...current,
    sections: current.sections.map((section, index) => index !== sectionIndex ? section : {
      ...section,
      blocks: section.blocks.map((block, blockPosition) => blockPosition === blockIndex ? { ...block, ...changes } : block),
    }),
  }))

  const addBlock = (sectionIndex, type) => setEditing((current) => ({
    ...current,
    sections: current.sections.map((section, index) => index === sectionIndex ? { ...section, blocks: [...section.blocks, newBlock(type)] } : section),
  }))

  const removeBlock = (sectionIndex, blockIndex) => setEditing((current) => ({
    ...current,
    sections: current.sections.map((section, index) => index === sectionIndex ? { ...section, blocks: section.blocks.filter((_, position) => position !== blockIndex) } : section),
  }))

  const moveBlock = (sectionIndex, blockIndex, direction) => setEditing((current) => ({
    ...current,
    sections: current.sections.map((section, index) => {
      if (index !== sectionIndex) return section
      const nextPosition = blockIndex + direction
      if (nextPosition < 0 || nextPosition >= section.blocks.length) return section
      const blocks = [...section.blocks]
      ;[blocks[blockIndex], blocks[nextPosition]] = [blocks[nextPosition], blocks[blockIndex]]
      return { ...section, blocks }
    }),
  }))

  const addSection = () => setEditing((current) => ({
    ...current,
    sections: [...current.sections, { id: `section-${Date.now()}`, title: 'New section', blocks: [newBlock('text')] }],
  }))

  const startNew = () => {
    const tutorial = createEmptyTutorial()
    saveDraft(tutorial)
    setDrafts(getDrafts())
    setEditing(tutorial)
    setValidation(null)
  }

  const handleSaveVersion = () => {
    saveVersion(editing)
    setSaveState('Version saved')
  }

  const handlePublish = () => {
    const result = publishTutorial(editing)
    setValidation(result.validation)
    if (result.validation.valid) {
      setEditing(result.tutorial)
      setDrafts(getDrafts())
      setPublished(getPublishedTutorials())
    }
  }

  const handleExport = () => {
    const blob = new Blob([exportTutorial(editing)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${editing.slug || 'tutorial'}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const imported = importTutorial(await file.text())
      setDrafts(getDrafts())
      setEditing(imported)
      setValidation(null)
    } catch {
      setValidation({ errors: ['The selected file is not valid tutorial JSON.'], warnings: [], valid: false })
    }
    event.target.value = ''
  }

  if (!editing) {
    return (
      <main className="page-shell builder-page">
        <section className="builder-hero">
          <div><span className="badge">Content authoring</span><h1>Tutorial Builder</h1><p>Create, edit, preview, and organize interactive developer tutorials.</p></div>
          <button type="button" className="primary-btn" onClick={startNew}>＋ New Tutorial</button>
        </section>
        <section className="builder-stats">
          <div className="panel"><strong>{drafts.length}</strong><span>Drafts</span></div>
          <div className="panel"><strong>{published.length}</strong><span>Published here</span></div>
          <div className="panel"><strong>{media.length}</strong><span>Library images</span></div>
        </section>
        <section className="panel builder-dashboard">
          <div className="section-heading"><h2>Drafts</h2><button type="button" className="secondary-btn" onClick={() => importInput.current?.click()}>Import Tutorial</button></div>
          <input ref={importInput} hidden type="file" accept="application/json" onChange={handleImport} />
          {drafts.length === 0 ? <p>No drafts yet. Create a tutorial to start building with blocks.</p> : <div className="draft-list">{drafts.map((draft) => <button type="button" className="draft-row" key={draft.id} onClick={() => setEditing(draft)}><span><strong>{draft.title}</strong><small>{draft.status} · {draft.sections?.length || 0} sections</small></span><span>Open →</span></button>)}</div>}
        </section>
        <section className="builder-template-grid">
          {['Basic Tutorial', 'Visual Tutorial', 'Troubleshooting Guide', 'Deployment Guide'].map((template) => <div className="panel" key={template}><h3>{template}</h3><p>Start with a structured content pattern.</p><button type="button" className="link-button" onClick={startNew}>Use template</button></div>)}
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell builder-page">
      <div className="builder-topbar">
        <div><button type="button" className="back-link builder-back-button" onClick={() => { setEditing(null); navigate('/tutorial-builder') }}>← Builder dashboard</button><h1>{editing.title}</h1><span className="save-indicator">{saveState}</span></div>
        <div className="builder-actions"><button type="button" className="secondary-btn" onClick={handleSaveVersion}>Save version</button><button type="button" className="secondary-btn" onClick={handleExport}>Export JSON</button><button type="button" className="secondary-btn" onClick={() => setEditing(duplicateTutorial(editing))}>Duplicate</button><button type="button" className="primary-btn" onClick={handlePublish}>Publish</button></div>
      </div>

      <section className="builder-meta panel">
        <div className="builder-field wide"><label>Title<input value={editing.title} onChange={(event) => updateTutorial('title', event.target.value)} /></label></div>
        <div className="builder-field"><label>Slug<input value={editing.slug} onChange={(event) => updateTutorial('slug', event.target.value)} /></label></div>
        <div className="builder-field wide"><label>Description<textarea value={editing.description} onChange={(event) => updateTutorial('description', event.target.value)} /></label></div>
        <div className="builder-field"><label>Category<select value={editing.categoryId} onChange={(event) => { const category = categories.find((item) => item.id === event.target.value); updateTutorial('categoryId', event.target.value); updateTutorial('category', category?.name || '') }} >{categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select></label></div>
        <div className="builder-field"><label>Difficulty<select value={editing.difficulty} onChange={(event) => updateTutorial('difficulty', event.target.value)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label></div>
        <div className="builder-field"><label>Estimated time<input value={editing.estimatedTime} onChange={(event) => updateTutorial('estimatedTime', event.target.value)} /></label></div>
      </section>

      <div className="builder-tabs"><button type="button" className={activeTab === 'editor' ? 'active' : ''} onClick={() => setActiveTab('editor')}>Editor</button><button type="button" className={activeTab === 'preview' ? 'active' : ''} onClick={() => setActiveTab('preview')}>Live preview</button><button type="button" className={activeTab === 'validate' ? 'active' : ''} onClick={() => { setValidation(validateTutorial(editing)); setActiveTab('validate') }}>Validate</button></div>

      {activeTab === 'editor' && <div className="builder-layout"><aside className="builder-outline panel"><h3>Outline</h3>{editing.sections.map((section, index) => <a href={`#builder-section-${section.id}`} key={section.id}> {index + 1}. {section.title}</a>)}</aside><section className="builder-editor">{editing.sections.map((section, sectionIndex) => <article className="builder-section panel" id={`builder-section-${section.id}`} key={section.id}><input className="section-title-input" value={section.title} onChange={(event) => updateSection(sectionIndex, 'title', event.target.value)} />{section.blocks.map((block, blockIndex) => <div className="builder-block" key={block.id}><div className="builder-block-header"><strong>{block.type}</strong><div><button type="button" onClick={() => moveBlock(sectionIndex, blockIndex, -1)}>↑</button><button type="button" onClick={() => moveBlock(sectionIndex, blockIndex, 1)}>↓</button><button type="button" onClick={() => removeBlock(sectionIndex, blockIndex)}>Delete</button></div></div><BlockEditor block={block} media={media} onChange={(changes) => updateBlock(sectionIndex, blockIndex, changes)} /></div>)}<div className="block-picker">{blockTypes.map(([type, label]) => <button type="button" key={type} onClick={() => addBlock(sectionIndex, type)}>＋ {label}</button>)}</div></article>)}<button type="button" className="secondary-btn" onClick={addSection}>＋ Add section</button></section></div>}

      {activeTab === 'preview' && <section className="builder-preview panel"><span className="eyebrow">Preview Tutorial</span><h2>{editing.title}</h2><p>{editing.description}</p>{editing.sections.map((section) => <div className="preview-section" key={section.id}><h3>{section.title}</h3>{section.blocks.map((block) => <PreviewBlock block={block} key={block.id} />)}</div>)}</section>}

      {activeTab === 'validate' && <section className="panel validation-panel"><h2>{validation?.valid ? 'Tutorial Ready' : 'Validate Tutorial'}</h2>{!validation && <p>Run validation before publishing.</p>}{validation?.errors.length > 0 && <><h3>Problems found</h3><ul>{validation.errors.map((error) => <li key={error}>{error}</li>)}</ul></>}{validation?.warnings.length > 0 && <><h3>Warnings</h3><ul>{validation.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul></>}</section>}
    </main>
  )
}

function BlockEditor({ block, media, onChange }) {
  if (block.type === 'divider') return <p className="muted-text">Divider block</p>
  if (block.type === 'text' || block.type === 'heading') return <textarea value={block.content || ''} onChange={(event) => onChange({ content: event.target.value })} />
  if (block.type === 'image') return <div className="block-fields"><label>Image<select value={block.imageId} onChange={(event) => onChange({ imageId: event.target.value })}>{media.map((item) => <option value={item.id} key={item.id}>{item.filename}</option>)}</select></label><label>Alt text<input value={block.altText || ''} onChange={(event) => onChange({ altText: event.target.value })} /></label><label>Caption<input value={block.caption || ''} onChange={(event) => onChange({ caption: event.target.value })} /></label></div>
  if (block.type === 'code') return <div className="block-fields"><label>Language<input value={block.language || ''} onChange={(event) => onChange({ language: event.target.value })} /></label><label>Title<input value={block.title || ''} onChange={(event) => onChange({ title: event.target.value })} /></label><label>Code<textarea value={block.code || ''} onChange={(event) => onChange({ code: event.target.value })} /></label><label>Explanation<input value={block.explanation || ''} onChange={(event) => onChange({ explanation: event.target.value })} /></label></div>
  if (block.type === 'terminal') return <div className="block-fields"><label>Command<input value={block.command || ''} onChange={(event) => onChange({ command: event.target.value })} /></label><label>Explanation<input value={block.explanation || ''} onChange={(event) => onChange({ explanation: event.target.value })} /></label></div>
  if (block.type === 'warning' || block.type === 'tip') return <div className="block-fields"><label>Title<input value={block.title || ''} onChange={(event) => onChange({ title: event.target.value })} /></label><label>Message<textarea value={block.content || ''} onChange={(event) => onChange({ content: event.target.value })} /></label></div>
  if (block.type === 'checklist') return <div className="block-fields"><label>Title<input value={block.title || ''} onChange={(event) => onChange({ title: event.target.value })} /></label><label>Items<textarea value={(block.items || []).join('\n')} onChange={(event) => onChange({ items: event.target.value.split('\n') })} /></label></div>
  if (block.type === 'quiz') return <div className="block-fields"><label>Question<input value={block.question || ''} onChange={(event) => onChange({ question: event.target.value })} /></label><label>Options<textarea value={(block.options || []).join('\n')} onChange={(event) => onChange({ options: event.target.value.split('\n') })} /></label><label>Correct option index<input type="number" min="0" value={block.correct || 0} onChange={(event) => onChange({ correct: Number(event.target.value) })} /></label><label>Explanation<input value={block.explanation || ''} onChange={(event) => onChange({ explanation: event.target.value })} /></label></div>
  if (block.type === 'link') return <div className="block-fields"><label>Label<input value={block.label || ''} onChange={(event) => onChange({ label: event.target.value })} /></label><label>URL<input value={block.url || ''} onChange={(event) => onChange({ url: event.target.value })} /></label></div>
  return null
}
