import { useState, useEffect, useRef, memo, useCallback } from 'react'
import { gsap } from 'gsap'
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
  
  const handleNavClick = useCallback((e, elementId) => {
    e.preventDefault()
    scrollToElement(elementId)
    setIsMenuOpen(false) // Fechar menu mobile ao clicar
  }, [])

  const handleLogoClick = useCallback((e) => {
    e.preventDefault()
    scrollToElement('home')
    setIsMenuOpen(false)
  }, [])
  
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  useEffect(() => {
    const handleScroll = rafThrottle(() => {
      setIsScrolled((window.scrollY || window.pageYOffset) > 50)
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Animações GSAP para o header
  useEffect(() => {
    if (!headerRef.current) return

    const header = headerRef.current
    const logo = logoRef.current
    const navLinks = navLinksRef.current.filter(Boolean)

    // Garantir visibilidade inicial SEMPRE
    gsap.set(header, { 
      opacity: 1, 
      y: 0, 
      visibility: 'visible',
      display: 'block'
    })
    if (logo) {
      gsap.set(logo, { 
        opacity: 1, 
        scale: 1, 
        rotation: 0,
        visibility: 'visible',
        display: 'block'
      })
    }
    navLinks.forEach(link => {
      if (link) {
        gsap.set(link, { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          visibility: 'visible',
          display: 'block'
        })
      }
    })

    // Garantir visibilidade inicial usando style direto
    header.style.opacity = '1'
    header.style.visibility = 'visible'
    header.style.display = 'block'
    header.style.transform = 'translateY(0)'
    
    if (logo) {
      logo.style.opacity = '1'
      logo.style.visibility = 'visible'
      logo.style.display = 'block'
      logo.style.transform = 'scale(1) rotate(0deg)'
    }
    
    navLinks.forEach(link => {
      if (link) {
        link.style.opacity = '1'
        link.style.visibility = 'visible'
        link.style.display = 'block'
        link.style.transform = 'translateY(0) scale(1)'
      }
    })

    // Animação inicial do header - usar to() ao invés de from()
    gsap.set(header, { y: -100, opacity: 0 })
    gsap.to(header, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    })

    // Animação do logo
    if (logo) {
      gsap.set(logo, { scale: 0, rotation: -180, opacity: 0 })
      gsap.to(logo, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        ease: 'back.out(1.7)'
      })
    }

    // Animação dos links de navegação (stagger)
    if (navLinks.length > 0) {
      navLinks.forEach(link => {
        if (link) gsap.set(link, { y: -20, opacity: 0 })
      })
      gsap.to(navLinks, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      })
    }

    // Animação de hover nos links
    navLinks.forEach((link) => {
      if (!link) return
      
      const handleMouseEnter = () => {
        gsap.to(link, {
          y: -2,
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      const handleMouseLeave = () => {
        gsap.to(link, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      link.addEventListener('mouseenter', handleMouseEnter)
      link.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        link.removeEventListener('mouseenter', handleMouseEnter)
        link.removeEventListener('mouseleave', handleMouseLeave)
      }
    })
  }, [])

  return (
    <header ref={headerRef} className={`header ${isScrolled ? 'scrolled' : ''}`}>
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
        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
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
  )
}

export default memo(Header)

