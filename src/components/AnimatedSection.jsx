import { useIntersectionObserver } from '@/utils/animations'
import './AnimatedSection.css'

function AnimatedSection({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useIntersectionObserver()

  // Garantir que seja visível por padrão, mesmo antes do observer
  const shouldBeVisible = isVisible !== false

  return (
    <div
      ref={ref}
      className={`animated-section ${shouldBeVisible ? 'visible' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` }}
      aria-hidden={!shouldBeVisible}
    >
      {children}
    </div>
  )
}

export default AnimatedSection

