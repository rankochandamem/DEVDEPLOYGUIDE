import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
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
import ReportsPage from './pages/ReportsPage'
import TutorialBuilderPage from './pages/TutorialBuilderPage'
import { getRecentSearches, readStorage, saveRecentSearch, writeStorage } from './services/storageService'
import { searchContent } from './services/searchService'

const POPULAR_SEARCHES = [
  { type: 'Tutorial', label: 'Install Git on Windows', slug: 'git-installation', path: '/tutorials/git-installation' },
  { type: 'Tutorial', label: 'GitHub basics', slug: 'github-basics', path: '/tutorials/github-basics' },
  { type: 'Tutorial', label: 'Deploy to Render', slug: 'render-deployment', path: '/tutorials/render-deployment' },
  { type: 'Category', label: 'Git & Version Control', slug: 'categories/git', path: '/categories/git' },
  { type: 'Category', label: 'Deployment', slug: 'categories/deployment', path: '/categories/deployment' },
  { type: 'Page', label: 'Image Library', slug: 'image-library', path: '/image-library' },
]

function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const initialTheme = readStorage().theme || 'dark'
  const [theme, setTheme] = useState(initialTheme)
  const [search, setSearch] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState(() => getRecentSearches())
  const blurTimerRef = useRef(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [siteLoading, setSiteLoading] = useState(true)
  const [showRefreshLoader, setShowRefreshLoader] = useState(false)

  useEffect(() => {
    const siteTimeoutId = window.setTimeout(() => setSiteLoading(false), 700)
    return () => window.clearTimeout(siteTimeoutId)
  }, [])

  const handleRefreshWebsite = () => {
    setShowRefreshLoader(true)
    window.setTimeout(() => {
      window.location.reload()
    }, 350)
  }

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
        setSearchFocused(false)
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
        setSearchFocused(false)
      }
    }

    document.addEventListener('click', closeSearchOnOutsideClick)
    return () => document.removeEventListener('click', closeSearchOnOutsideClick)
  }, [])

  const searchResults = useMemo(() => searchContent(search), [search])
  const searchSuggestions = useMemo(() => {
    const normalizedTerm = search.trim().toLowerCase()
    const dynamicResults = normalizedTerm ? searchContent(normalizedTerm) : []
    const allSuggestions = [...dynamicResults, ...POPULAR_SEARCHES]
    const deduped = [...new Map(allSuggestions.map((item) => [item.label.toLowerCase(), item])).values()]

    const filteredSuggestions = deduped.filter((result) => {
      if (!normalizedTerm) return true
      return result.label.toLowerCase().includes(normalizedTerm)
    })

    const randomizedSuggestions = [...filteredSuggestions]
    for (let index = randomizedSuggestions.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1))
      ;[randomizedSuggestions[index], randomizedSuggestions[randomIndex]] = [randomizedSuggestions[randomIndex], randomizedSuggestions[index]]
    }

    return randomizedSuggestions.slice(0, 6)
  }, [search, recentSearches, searchFocused])

  const applySearchTerm = (term, result) => {
    const nextTerm = String(term || '').trim()
    if (!nextTerm) {
      return
    }

    const matchedResult = result || searchContent(nextTerm)[0]

    setRecentSearches(saveRecentSearch(nextTerm))

    if (matchedResult?.path) {
      setSearch('')
      setSearchFocused(false)
      setMobileSearchOpen(false)
      navigate(matchedResult.path)
      return
    }

    if (matchedResult?.slug) {
      const target = matchedResult.type === 'Category' ? `/${matchedResult.slug}` : `/tutorials/${matchedResult.slug}`
      setSearch('')
      setSearchFocused(false)
      setMobileSearchOpen(false)
      navigate(target)
      return
    }

    setSearch(nextTerm)
  }

  const clearBlurTimer = () => {
    if (blurTimerRef.current) {
      window.clearTimeout(blurTimerRef.current)
      blurTimerRef.current = null
    }
  }

  const keepSearchOpen = () => {
    clearBlurTimer()
    setSearchFocused(true)
    requestAnimationFrame(() => document.querySelector('.top-search-box input')?.focus())
  }

  const clearRecentSearches = () => {
    keepSearchOpen()
    const state = readStorage()
    state.recentSearches = []
    writeStorage(state)
    setRecentSearches([])
  }

  const removeRecentSearch = (term) => {
    keepSearchOpen()
    const nextSearches = (getRecentSearches() || []).filter((item) => item.toLowerCase() !== String(term).toLowerCase())
    const state = readStorage()
    state.recentSearches = nextSearches
    writeStorage(state)
    setRecentSearches(nextSearches)
  }

  const isNotFoundPage = !isKnownRoute(pathname)

  return (
    <div className={`app-shell${sidebarCollapsed ? ' sidebar-collapsed' : ''}${isNotFoundPage ? ' standalone-error-shell' : ''}`}>
      <ScrollToTop />
      {!isNotFoundPage && <Navbar
        theme={theme}
        onRefreshWebsite={handleRefreshWebsite}
        onToggleTheme={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
        collapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed((current) => !current)}
        mobileOpen={mobileNavOpen}
        onToggleMobile={() => setMobileNavOpen((current) => !current)}
        onCloseMobile={() => setMobileNavOpen(false)}
        mobileSearchOpen={mobileSearchOpen}
        onToggleSearch={() => {
          setMobileNavOpen(false)
          setMobileSearchOpen((current) => !current)
          if (!mobileSearchOpen) {
            requestAnimationFrame(() => document.querySelector('.top-search-box input')?.focus())
          }
        }}
      />}

      {!isNotFoundPage && <div className={`content-toolbar${mobileSearchOpen ? ' mobile-search-open' : ''}`}>
        <div className="top-search-box">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onFocus={() => {
              clearBlurTimer()
              setSearchFocused(true)
            }}
            onBlur={(event) => {
              const nextFocusTarget = event.relatedTarget
              if (nextFocusTarget && nextFocusTarget.closest('.content-toolbar')) {
                return
              }
              blurTimerRef.current = window.setTimeout(() => setSearchFocused(false), 120)
            }}
            onChange={(event) => {
              clearBlurTimer()
              setSearch(event.target.value)
              setSearchFocused(true)
            }}
            placeholder="Search tutorials, guides, and tools..."
            aria-label="Search tutorials, guides, and tools"
          />
        </div>

        {searchFocused && (search || recentSearches.length > 0 || searchSuggestions.length > 0) && (
          <div className="search-panel">
            <div className="search-panel-inner">
              {!search && (
                <>
                  {recentSearches.length > 0 && (
                    <div className="search-section-group">
                      <div className="search-history-header">
                        <p className="search-section-label">Recent searches</p>
                        <button
                          type="button"
                          className="search-history-clear"
                          onMouseDown={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            keepSearchOpen()
                          }}
                          onClick={(event) => {
                            event.stopPropagation()
                            clearRecentSearches()
                          }}
                        >
                          Clear
                        </button>
                      </div>
                      <div className="search-suggestion-list">
                        {recentSearches.map((term) => (
                          <div key={`recent-${term}`} className="search-history-item">
                            <button
                              type="button"
                              className="search-suggestion"
                              onClick={() => {
                                const match = searchContent(term).find((result) => result.label.toLowerCase() === term.toLowerCase()) || searchContent(term)[0]
                                applySearchTerm(term, match)
                              }}
                            >
                              {term}
                            </button>
                            <button
                              type="button"
                              className="search-history-remove"
                              aria-label={`Remove ${term}`}
                              onMouseDown={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                                keepSearchOpen()
                              }}
                              onClick={(event) => {
                                event.stopPropagation()
                                removeRecentSearch(term)
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="search-section-group">
                    <p className="search-section-label">Suggested</p>
                    <div className="search-suggestion-list">
                      {searchSuggestions.map((result) => (
                        <button
                          key={`suggested-${result.label}`}
                          type="button"
                          className="search-suggestion"
                          onClick={() => applySearchTerm(result.label, result)}
                        >
                          {result.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {search && (
                searchResults.length === 0 ? (
                  <>
                    <p>No matches found for “{search}”.</p>
                    <div className="search-section-group compact">
                      <p className="search-section-label">Try one of these</p>
                      <div className="search-suggestion-list">
                        {searchSuggestions.slice(0, 4).map((result) => (
                          <button
                            key={`empty-${result.label}`}
                            type="button"
                            className="search-suggestion"
                            onClick={() => applySearchTerm(result.label, result)}
                          >
                            {result.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  searchResults.map((result) => (
                    <Link
                      key={`${result.type}-${result.label}`}
                      to={result.type === 'Category' ? `/${result.slug}` : `/tutorials/${result.slug}`}
                      className="search-result-item"
                      onClick={() => {
                        setRecentSearches(saveRecentSearch(result.label))
                        setSearch('')
                        setMobileSearchOpen(false)
                      }}
                    >
                      <span>{result.type}</span>
                      <strong>{result.label}</strong>
                    </Link>
                  ))
                )
              )}
            </div>
          </div>
        )}
      </div>}

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
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/tutorial-builder" element={<TutorialBuilderPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!isNotFoundPage && <BackToTopButton />}
      {!isNotFoundPage && <footer className="page-footer">DevDeploy Guide v1.1.0</footer>}
    </div>
  )
}

function isKnownRoute(pathname) {
  return [
    /^\/$/,
    /^\/tutorials(?:\/[^/]+)?$/,
    /^\/categories(?:\/[^/]+)?$/,
    /^\/(bookmarks|resources|troubleshooting|changelog|workspace|challenges|error-lab|tools|image-library|reports|tutorial-builder)$/,
  ].some((pattern) => pattern.test(pathname))
}

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-card" aria-labelledby="not-found-title">
        <span className="eyebrow">Error 404</span>
        <h1 id="not-found-title">Page not found</h1>
        <p>The link you followed does not point to a page that exists or is currently available.</p>
        <Link className="page-back-button not-found-button" to="/">
          <span aria-hidden="true">←</span>
          <span className="page-back-label">Back</span>
        </Link>
      </section>
    </main>
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
      <img src="/media/logo2.png" alt="" className="back-to-top-logo" />
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
