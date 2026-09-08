import { useState } from 'react'

export default function CodeBlock({ language = 'bash', code, title = 'Command' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (error) {
      console.warn('Copy failed', error)
    }
  }

  return (
    <div className="code-block">
      <div className="code-header">
        <span>{title}</span>
        <button type="button" onClick={handleCopy}>{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <pre data-language={language}>{code}</pre>
    </div>
  )
}
