import { useEffect, useRef, useState } from 'react'
import './ParallaxSection.css'

function ParallaxSection({ children, speed = 0.5, className = '' }) {
  const [offset, setOffset] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    let rafId = null
    
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      
      rafId = requestAnimationFrame(() => {
      if (ref.current) {
        const scrolled = window.pageYOffset
        const parallax = scrolled * speed
        setOffset(parallax)
      }
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
  }, [speed])

  return (
    <div
      ref={ref}
      className={`parallax-section ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  )
}

export default ParallaxSection

