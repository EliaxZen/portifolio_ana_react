import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './ScrollProgress.css'

function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const barRef = useRef(null)

  useEffect(() => {
    let rafId = null
    
    const updateScrollProgress = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      
      rafId = requestAnimationFrame(() => {
        const scrollPx = document.documentElement.scrollTop || window.pageYOffset
        const winHeightPx =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight
        const scrolled = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0
        const newProgress = Math.min(100, Math.max(0, scrolled))
        
        setScrollProgress(newProgress)
        
        // Animação GSAP suave
        if (barRef.current) {
          gsap.to(barRef.current, {
            width: `${newProgress}%`,
            duration: 0.3,
            ease: 'power2.out',
          })
        }
      })
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress()
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <div className="scroll-progress-container">
      <div
        ref={barRef}
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-label="Progresso de rolagem"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  )
}

export default ScrollProgress

