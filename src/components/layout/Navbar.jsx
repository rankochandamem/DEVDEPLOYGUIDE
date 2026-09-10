import { NavLink } from 'react-router-dom'

export default function Navbar({ theme, onToggleTheme, collapsed, onToggleSidebar, mobileOpen, onToggleMobile, onCloseMobile, mobileSearchOpen, onToggleSearch, onRefreshWebsite }) {
  return (
    <>
      <div className="mobile-header">
        <button type="button" className="mobile-menu-toggle" onClick={onToggleMobile} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen}>
          {mobileOpen ? '×' : '☰'}
        </button>
        <NavLink className="mobile-brand" to="/" aria-label="Go to DevDeploy Guide home">
          DEVDEPLOY GUIDE
        </NavLink>
        <button type="button" className="mobile-search-button" onClick={onToggleSearch} aria-label={mobileSearchOpen ? 'Hide search' : 'Show search'}>
          <span className="mobile-search-icon" aria-hidden="true">⌕</span>
          <span className="mobile-search-close" aria-hidden="true">×</span>
        </button>
      </div>
      <div className={`mobile-nav-backdrop${mobileOpen ? ' is-open' : ''}`} onClick={onCloseMobile} aria-hidden="true" />
      <header className={`topbar${collapsed ? ' sidebar-collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}>
        <div className="brand-wrap">
          <button
            type="button"
            className="brand-mark"
            onClick={onToggleSidebar}
            aria-label={collapsed ? 'Open sidebar' : 'Close sidebar'}
            data-tooltip={collapsed ? 'Open sidebar' : 'Close sidebar'}
          >
            <img src="/media/logo2.png" alt="DevDeploy Guide logo" />
          </button>
          <div className="brand-copy">
            <p className="eyebrow">Developer guide</p>
            <h3>DEVDEPLOY GUIDE</h3>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation" onClick={onCloseMobile}>
        <NavLink to="/" end data-tooltip="Home"><span className="nav-icon">⌂</span><span className="nav-label">Home</span></NavLink>
        <NavLink to="/tutorials" data-tooltip="Learn"><span className="nav-icon">▤</span><span className="nav-label">Learn</span></NavLink>
        <NavLink to="/tools" data-tooltip="Tools"><span className="nav-icon">⚒</span><span className="nav-label">Tools</span></NavLink>
        <NavLink to="/image-library" data-tooltip="Image Library"><span className="nav-icon">▧</span><span className="nav-label">Image Library</span></NavLink>
        <NavLink to="/troubleshooting" data-tooltip="Troubleshooting"><span className="nav-icon">?</span><span className="nav-label">Troubleshooting</span></NavLink>
        <NavLink to="/resources" data-tooltip="Resources"><span className="nav-icon">▥</span><span className="nav-label">Resources</span></NavLink>
        <NavLink to="/bookmarks" data-tooltip="Bookmarks"><span className="nav-icon">☆</span><span className="nav-label">Bookmarks</span></NavLink>
        <NavLink to="/error-lab" data-tooltip="Error Lab"><span className="nav-icon">!</span><span className="nav-label">Error Lab</span></NavLink>
        <NavLink to="/changelog" data-tooltip="Changelog"><span className="nav-icon">◷</span><span className="nav-label">Changelog</span></NavLink>
        </nav>

        <div className="topbar-actions">
          <button type="button" className="refresh-button" onClick={onRefreshWebsite} aria-label="Refresh website">
            ↻
          </button>
          <button type="button" className="theme-toggle" onClick={onToggleTheme}>
            <span className="theme-icon" aria-hidden="true">{theme === 'light' ? '🌙' : '☀'}</span>
            <span className="theme-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </header>
    </>
  )
}
