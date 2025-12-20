import { useState, useEffect, useRef, memo, useCallback } from 'react'
import { scrollToElement } from '@/utils'
import { SITE_NAME } from '@/utils/constants'
import { rafThrottle } from '@/utils/performance'
import './Header.css'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const navLinksRef = useRef([])
  const logoRef = useRef(null)
  const navRef = useRef(null)
  
  const handleNavClick = useCallback((e, elementId) => {
    e.preventDefault()
    scrollToElement(elementId)
    setIsMenuOpen(false) // Fechar menu mobile ao clicar
    
    // Adicionar feedback tátil em mobile
    if (e.currentTarget) {
      e.currentTarget.style.transform = 'scale(0.95)'
      setTimeout(() => {
        if (e.currentTarget) {
          e.currentTarget.style.transform = ''
        }
      }, 150)
    }
  }, [])

  const handleLogoClick = useCallback((e) => {
    e.preventDefault()
    scrollToElement('home')
    setIsMenuOpen(false)
  }, [])
  
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  // Fechar menu ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    
    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevenir scroll do body quando menu está aberto
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = rafThrottle(() => {
      setIsScrolled((window.scrollY || window.pageYOffset) > 50)
      // NÃO fechar menu ao fazer scroll em mobile
      // O menu só fecha quando o usuário clica em um link ou no overlay
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Garantir visibilidade inicial do header
  useEffect(() => {
    if (!headerRef.current) return

    const header = headerRef.current
    const logo = logoRef.current
    const navLinks = navLinksRef.current.filter(Boolean)

    // Garantir visibilidade inicial
    header.style.opacity = '1'
    header.style.visibility = 'visible'
    
    if (logo) {
      logo.style.opacity = '1'
      logo.style.visibility = 'visible'
    }
    
    navLinks.forEach(link => {
      if (link) {
        link.style.opacity = '1'
        link.style.visibility = 'visible'
      }
    })
  }, [])

  // Garantir que o menu mobile permaneça visível quando aberto
  useEffect(() => {
    if (!navRef.current) return

    const nav = navRef.current
    const isMobile = window.innerWidth <= 768

    if (isMenuOpen && isMobile) {
      // Forçar visibilidade com style direto
      nav.style.setProperty('transform', 'translateY(0)', 'important')
      nav.style.setProperty('opacity', '1', 'important')
      nav.style.setProperty('visibility', 'visible', 'important')
      nav.style.setProperty('display', 'flex', 'important')
      nav.style.setProperty('z-index', '1002', 'important')
      nav.style.setProperty('pointer-events', 'all', 'important')

      // Garantir que os links também estejam visíveis
      const links = nav.querySelectorAll('.nav-link')
      links.forEach(link => {
        link.style.setProperty('opacity', '1', 'important')
        link.style.setProperty('visibility', 'visible', 'important')
        link.style.setProperty('transform', 'none', 'important')
      })
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Overlay para mobile quando menu está aberto */}
      {isMenuOpen && (
        <div 
          className="menu-overlay"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
      <header ref={headerRef} className={`header ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="header-container">
          <a 
            ref={logoRef}
            href="#home" 
            onClick={handleLogoClick} 
            className="header-logo"
          >
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="logo-text">{SITE_NAME}</span>
          </a>
          <nav 
            ref={navRef}
            className={`header-nav ${isMenuOpen ? 'open' : ''}`}
          >
            <a 
              ref={(el) => (navLinksRef.current[0] = el)}
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')} 
              className="nav-link"
            >
              Início
            </a>
            <a 
              ref={(el) => (navLinksRef.current[1] = el)}
              href="#sobre" 
              onClick={(e) => handleNavClick(e, 'sobre')} 
              className="nav-link"
            >
              Sobre
            </a>
            <a 
              ref={(el) => (navLinksRef.current[2] = el)}
              href="#projetos" 
              onClick={(e) => handleNavClick(e, 'projetos')} 
              className="nav-link"
            >
              Projetos
            </a>
            <a 
              ref={(el) => (navLinksRef.current[3] = el)}
              href="#contato" 
              onClick={(e) => handleNavClick(e, 'contato')} 
              className="nav-link"
            >
              Contato
            </a>
          </nav>
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  )
}

export default memo(Header)

