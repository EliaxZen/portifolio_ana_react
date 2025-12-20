import { useEffect, useRef } from 'react'
import { useIntersectionObserver } from '@/utils/animations'
import { fadeInUp } from '@/utils/gsapAnimations'
import './AnimatedSection.css'

function AnimatedSection({ children, delay = 0, className = '', animationType = 'fadeInUp' }) {
  const [ref, isVisible] = useIntersectionObserver()
  const sectionRef = useRef(null)
  const animationRef = useRef(null)

  // Garantir que seja visível por padrão, mesmo antes do observer
  const shouldBeVisible = isVisible !== false

  useEffect(() => {
    const element = sectionRef.current || ref.current
    if (!element) return

    // Garantir visibilidade inicial (fallback)
    element.style.opacity = '1'
    element.style.visibility = 'visible'

    // Aplicar animação GSAP
    if (animationType === 'fadeInUp') {
      animationRef.current = fadeInUp(element, { delay: delay / 1000 })
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.kill?.()
      }
    }
  }, [delay, animationType, ref])

  return (
    <div
      ref={(node) => {
        sectionRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref && 'current' in ref) {
          ref.current = node
        }
      }}
      className={`animated-section ${shouldBeVisible ? 'visible' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` }}
      aria-hidden={!shouldBeVisible}
    >
      {children}
    </div>
  )
}

export default AnimatedSection

