// Animações e utilitários de UI/UX
import { useState, useEffect, useRef } from 'react'

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
}

// Intersection Observer para animações ao scroll
export function useIntersectionObserver(callback, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(true) // Iniciar como true para visibilidade imediata
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) {
      // Se não houver elemento, manter visível
      setIsIntersecting(true)
      return
    }

    // Se não houver IntersectionObserver, manter visível
    if (typeof IntersectionObserver === 'undefined') {
      setIsIntersecting(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsIntersecting(true)
          setHasAnimated(true)
          if (callback) callback()
        }
      },
      {
        threshold: 0.1,
        ...options,
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [callback, hasAnimated, options])

  return [elementRef, isIntersecting]
}

