import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import TutorialsPage from './pages/TutorialsPage'
import TutorialDetailPage from './pages/TutorialDetailPage'
import CategoriesPage from './pages/CategoriesPage'
import BookmarksPage from './pages/BookmarksPage'
import ResourcesPage from './pages/ResourcesPage'
import TroubleshootingPage from './pages/TroubleshootingPage'
import ChangelogPage from './pages/ChangelogPage'
import WorkspacePage from './pages/WorkspacePage'
import ChallengesPage from './pages/ChallengesPage'
import ErrorLabPage from './pages/ErrorLabPage'
import ToolsPage from './pages/ToolsPage'
import ImageLibraryPage from './pages/ImageLibraryPage'
import TutorialBuilderPage from './pages/TutorialBuilderPage'
import { readStorage, writeStorage } from './services/storageService'
import { searchContent } from './services/searchService'

function App() {
  const initialTheme = readStorage().theme || 'light'
  const [theme, setTheme] = useState(initialTheme)
  const [search, setSearch] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const state = readStorage()
    state.theme = theme
    writeStorage(state)
  }, [theme])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileNavOpen(false)
        setMobileSearchOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.classList.toggle('nav-drawer-open', mobileNavOpen)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.classList.remove('nav-drawer-open')
    }
  }, [mobileNavOpen])

  useEffect(() => {
    const closeSearchOnOutsideClick = (event) => {
      const insideSearchToolbar = event.target.closest('.content-toolbar')
      const insideMobileSearchButton = event.target.closest('.mobile-search-button')

      if (!insideSearchToolbar && !insideMobileSearchButton) {
        setSearch('')
        setMobileSearchOpen(false)
      }
    }

    document.addEventListener('click', closeSearchOnOutsideClick)
    return () => document.removeEventListener('click', closeSearchOnOutsideClick)
  }, [])

  const searchResults = useMemo(() => searchContent(search), [search])

  return (
    <div className={`app-shell${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      <ScrollToTop />
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
        collapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed((current) => !current)}
        mobileOpen={mobileNavOpen}
        onToggleMobile={() => setMobileNavOpen((current) => !current)}
        onCloseMobile={() => setMobileNavOpen(false)}
        mobileSearchOpen={mobileSearchOpen}
        onToggleSearch={() => {
          setMobileSearchOpen((current) => !current)
          if (!mobileSearchOpen) {
            requestAnimationFrame(() => document.querySelector('.top-search-box input')?.focus())
          }
        }}
      />

      <div className={`content-toolbar${mobileSearchOpen ? ' mobile-search-open' : ''}`}>
        <div className="top-search-box">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tutorials, guides, and tools..."
            aria-label="Search tutorials, guides, and tools"
          />
        </div>

        {search && (
          <div className="search-panel">
            <div className="search-panel-inner">
              {searchResults.length === 0 ? (
                <p>No matches found for “{search}”.</p>
              ) : (
                searchResults.map((result) => (
                  <Link
                    key={`${result.type}-${result.label}`}
                    to={result.type === 'Category' ? `/${result.slug}` : `/tutorials/${result.slug}`}
                    className="search-result-item"
                    onClick={() => {
                      setSearch('')
                      setMobileSearchOpen(false)
                    }}
                  >
                    <span>{result.type}</span>
                    <strong>{result.label}</strong>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/tutorials/:slug" element={<TutorialDetailPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:categoryId" element={<CategoriesPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/troubleshooting" element={<TroubleshootingPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/error-lab" element={<ErrorLabPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/image-library" element={<ImageLibraryPage />} />
        <Route path="/tutorial-builder" element={<TutorialBuilderPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      <BackToTopButton />
      <footer className="page-footer">DevDeploy Guide v1.1.0</footer>
    </div>
  )
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 260)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      className={`back-to-top-button${visible ? ' visible' : ''}`}
      type="button"
      aria-label="Back to top"
      data-tooltip="Back on top"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
    >
      <img src="/media/logo1.png" alt="" className="back-to-top-logo" />
    </button>
  )
}

function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    resetScroll()

    const onPopState = () => {
      window.setTimeout(resetScroll, 0)
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [pathname, search])

  return null
}

export default App
