import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './BackToTop.css'

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    let rafId = null
    
    const toggleVisibility = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      
      rafId = requestAnimationFrame(() => {
        const shouldBeVisible = (window.scrollY || window.pageYOffset) > 300
        
        if (shouldBeVisible !== isVisible) {
          setIsVisible(shouldBeVisible)
          
          // Animação GSAP
          if (buttonRef.current) {
            if (shouldBeVisible) {
              gsap.fromTo(buttonRef.current, 
                {
                  opacity: 0,
                  scale: 0.5,
                  y: 20,
                },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.5,
                  ease: 'back.out(1.7)',
                }
              )
            } else {
              gsap.to(buttonRef.current, {
                opacity: 0,
                scale: 0.5,
                y: 20,
                duration: 0.3,
                ease: 'power2.in',
              })
            }
          }
        }
      })
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    toggleVisibility()
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [isVisible])

  const scrollToTop = () => {
    // Animação de clique
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      })
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    
    // Focus no header para acessibilidade
    const header = document.querySelector('header')
    if (header) {
      header.setAttribute('tabindex', '-1')
      header.focus()
      header.addEventListener('blur', () => {
        header.removeAttribute('tabindex')
      }, { once: true })
    }
  }

  return (
    <button
      ref={buttonRef}
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      type="button"
      style={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 19V5M5 12L12 5L19 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default BackToTop

