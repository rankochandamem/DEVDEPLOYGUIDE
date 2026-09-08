export default function Badge({ children, tone = 'primary' }) {
  const toneClass = tone === 'secondary' ? 'badge badge-secondary' : 'badge'
  return <span className={toneClass}>{children}</span>
}
