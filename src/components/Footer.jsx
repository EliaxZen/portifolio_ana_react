import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE_NAME, SOCIAL_LINKS, PERSONAL_INFO } from '@/utils/constants'
import { scrollToElement } from '@/utils'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef(null)
  const sectionsRef = useRef([])
  const socialLinksRef = useRef([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    gsap.registerPlugin(ScrollTrigger)
    
    const footer = footerRef.current
    if (!footer) return

    // Animação do footer ao entrar na viewport
    gsap.fromTo(footer,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Animação stagger para as seções
    const sections = sectionsRef.current.filter(Boolean)
    if (sections.length > 0) {
      gsap.fromTo(sections,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Animação simples para os links sociais
    const socialLinks = socialLinksRef.current.filter(Boolean)
    if (socialLinks.length > 0) {
      gsap.fromTo(socialLinks,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }, [])

  const handleLinkClick = (e, elementId) => {
    e.preventDefault()
    scrollToElement(elementId)
  }

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div ref={(el) => (sectionsRef.current[0] = el)} className="footer-section">
            <h3>{SITE_NAME}</h3>
            <p>{PERSONAL_INFO.description}</p>
            <p className="footer-university">🎓 {PERSONAL_INFO.university}</p>
          </div>

          <div ref={(el) => (sectionsRef.current[1] = el)} className="footer-section">
            <h4>Navegação</h4>
            <ul>
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>
                  Início
                </a>
              </li>
              <li>
                <a href="#sobre" onClick={(e) => handleLinkClick(e, 'sobre')}>
                  Sobre
                </a>
              </li>
              <li>
                <a href="#projetos" onClick={(e) => handleLinkClick(e, 'projetos')}>
                  Projetos
                </a>
              </li>
              <li>
                <a href="#contato" onClick={(e) => handleLinkClick(e, 'contato')}>
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div ref={(el) => (sectionsRef.current[2] = el)} className="footer-section">
            <h4>Redes Sociais</h4>
            <div className="footer-social">
              {SOCIAL_LINKS.instagram && (
                <a
                  ref={(el) => (socialLinksRef.current[0] = el)}
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="social-link instagram"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
                  </svg>
                </a>
              )}
              {SOCIAL_LINKS.linkedin && (
                <a
                  ref={(el) => (socialLinksRef.current[1] = el)}
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="social-link linkedin"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                  </svg>
                </a>
              )}
              {SOCIAL_LINKS.behance && (
                <a
                  ref={(el) => (socialLinksRef.current[2] = el)}
                  href={SOCIAL_LINKS.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Behance"
                  className="social-link behance"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.94 2.49-5.92 5.564-5.92 3.06 0 4.658 1.621 5.101 3h3.464c-.439-2.838-2.839-4.505-8.565-4.505-6.792 0-10.435 3.974-10.435 9.505 0 5.34 3.643 9.505 10.435 9.505 5.726 0 8.126-1.667 8.565-4.505h-3.464zm-7.889-6.3c-2.203 0-2.435 1.264-2.435 2.327 0 1.06.232 2.327 2.435 2.327 2.204 0 2.436-1.264 2.436-2.327 0-1.063-.232-2.327-2.436-2.327zm-9.67 6.3h3.894c-.216 1.556-1.379 2.729-3.894 2.729-2.535 0-3.812-1.389-3.812-3.175 0-1.778 1.277-3.143 3.812-3.143 2.515 0 3.678 1.388 3.894 2.833h-3.778c.09.677.375 1.185 1.433 1.185 1.064 0 1.433-.508 1.433-1.185h3.894c0 2.008-1.227 3.495-3.894 3.495-2.667 0-3.894-1.487-3.894-3.495 0-2.008 1.227-3.487 3.894-3.487 2.667 0 3.894 1.479 3.894 3.487z" fill="currentColor"/>
                  </svg>
                </a>
              )}
            </div>
            {SOCIAL_LINKS.email && (
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="footer-email">
                📧 {SOCIAL_LINKS.email}
              </a>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {SITE_NAME}. Todos os direitos reservados.
          </p>
          <p className="footer-made">
            Feito com <span className="heart">❤️</span> para {PERSONAL_INFO.name}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

