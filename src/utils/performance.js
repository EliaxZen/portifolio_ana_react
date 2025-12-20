// Utilitários de performance

/**
 * Throttle function - limita a execução de uma função
 */
export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Debounce function - atrasa a execução de uma função
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * RequestAnimationFrame wrapper para melhor performance
 */
export function rafThrottle(func) {
  let rafId = null
  return function(...args) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(this, args)
        rafId = null
      })
    }
  }
}

/**
 * Verifica se o dispositivo tem baixa performance
 */
export function isLowEndDevice() {
  if (typeof navigator === 'undefined') return false
  
  const hardwareConcurrency = navigator.hardwareConcurrency || 2
  const deviceMemory = navigator.deviceMemory || 4
  
  return hardwareConcurrency <= 2 || deviceMemory <= 2
}

/**
 * Verifica se deve reduzir animações
 */
export function shouldReduceMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Lazy load de imagens
 */
export function lazyLoadImage(img) {
  if (!img || !('IntersectionObserver' in window)) {
    return
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target
        if (image.dataset.src) {
          image.src = image.dataset.src
          image.removeAttribute('data-src')
        }
        observer.unobserve(image)
      }
    })
  })

  imageObserver.observe(img)
}



