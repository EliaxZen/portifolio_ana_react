import { useState, useEffect } from 'react'
import './BackToTop.css'

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let rafId = null
    
    const toggleVisibility = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      
      rafId = requestAnimationFrame(() => {
        setIsVisible(window.pageYOffset > 300)
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
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      type="button"
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

