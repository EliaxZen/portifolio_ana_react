import { useState, useEffect } from 'react'
import { scrollToElement } from '@/utils'
import { SITE_NAME } from '@/utils/constants'
import './Header.css'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const handleNavClick = (e, elementId) => {
    e.preventDefault()
    scrollToElement(elementId)
    setIsMenuOpen(false) // Fechar menu mobile ao clicar
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    scrollToElement('home')
    setIsMenuOpen(false)
  }
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    let rafId = null
    
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      
      rafId = requestAnimationFrame(() => {
        setIsScrolled((window.scrollY || window.pageYOffset) > 50)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <a href="#home" onClick={handleLogoClick} className="header-logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
              <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <span className="logo-text">{SITE_NAME}</span>
        </a>
        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="nav-link">
            Início
          </a>
          <a href="#sobre" onClick={(e) => handleNavClick(e, 'sobre')} className="nav-link">
            Sobre
          </a>
          <a href="#projetos" onClick={(e) => handleNavClick(e, 'projetos')} className="nav-link">
            Projetos
          </a>
          <a href="#contato" onClick={(e) => handleNavClick(e, 'contato')} className="nav-link">
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
  )
}

export default Header

