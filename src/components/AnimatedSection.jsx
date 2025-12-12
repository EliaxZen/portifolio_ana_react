import { useIntersectionObserver } from '@/utils/animations'
import './AnimatedSection.css'

function AnimatedSection({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={`animated-section ${isVisible ? 'visible' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` }}
      aria-hidden={!isVisible}
    >
      {children}
    </div>
  )
}

export default AnimatedSection

