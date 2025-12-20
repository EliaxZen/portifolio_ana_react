// Utilitários de animação GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { shouldReduceMotion, isLowEndDevice } from './performance'

// Registrar plugins do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Configuração global do GSAP
const GSAP_CONFIG = {
  duration: 0.8,
  ease: 'power3.out',
  stagger: 0.1,
}

// Verificar se deve reduzir animações
const shouldAnimate = () => {
  if (typeof window === 'undefined') return false
  return !shouldReduceMotion() && !isLowEndDevice()
}

/**
 * Animação de fade in up com scroll trigger
 */
export const fadeInUp = (element, options = {}) => {
  if (!element || !shouldAnimate()) {
    // Fallback: garantir visibilidade
    if (element) {
      gsap.set(element, { opacity: 1, y: 0 })
    }
    return null
  }

  const {
    delay = 0,
    duration = GSAP_CONFIG.duration,
    y = 50,
    trigger = element,
    start = 'top 85%',
    useScrollTrigger = true,
  } = options

  const animationConfig = {
    opacity: 1,
    y: 0,
    duration: duration,
    delay: delay,
    ease: GSAP_CONFIG.ease,
  }

  // Adicionar ScrollTrigger se disponível e solicitado
  if (useScrollTrigger && typeof window !== 'undefined') {
    animationConfig.scrollTrigger = {
      trigger: trigger,
      start: start,
      toggleActions: 'play none none none',
    }
  }

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: y,
    },
    animationConfig
  )
}

/**
 * Animação de fade in
 */
export const fadeIn = (element, options = {}) => {
  if (!element || !shouldAnimate()) {
    if (element) {
      gsap.set(element, { opacity: 1 })
    }
    return null
  }

  const {
    delay = 0,
    duration = GSAP_CONFIG.duration,
    trigger = element,
    start = 'top 85%',
  } = options

  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: duration,
      delay: delay,
      ease: GSAP_CONFIG.ease,
      scrollTrigger: {
        trigger: trigger,
        start: start,
        toggleActions: 'play none none none',
      },
    }
  )
}

/**
 * Animação de slide in left
 */
export const slideInLeft = (element, options = {}) => {
  if (!element || !shouldAnimate()) {
    if (element) {
      gsap.set(element, { opacity: 1, x: 0 })
    }
    return null
  }

  const {
    delay = 0,
    duration = GSAP_CONFIG.duration,
    x = -100,
    trigger = element,
    start = 'top 85%',
  } = options

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: x,
    },
    {
      opacity: 1,
      x: 0,
      duration: duration,
      delay: delay,
      ease: GSAP_CONFIG.ease,
      scrollTrigger: {
        trigger: trigger,
        start: start,
        toggleActions: 'play none none none',
      },
    }
  )
}

/**
 * Animação de slide in right
 */
export const slideInRight = (element, options = {}) => {
  if (!element || !shouldAnimate()) {
    if (element) {
      gsap.set(element, { opacity: 1, x: 0 })
    }
    return null
  }

  const {
    delay = 0,
    duration = GSAP_CONFIG.duration,
    x = 100,
    trigger = element,
    start = 'top 85%',
  } = options

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: x,
    },
    {
      opacity: 1,
      x: 0,
      duration: duration,
      delay: delay,
      ease: GSAP_CONFIG.ease,
      scrollTrigger: {
        trigger: trigger,
        start: start,
        toggleActions: 'play none none none',
      },
    }
  )
}

/**
 * Animação de scale in
 */
export const scaleIn = (element, options = {}) => {
  if (!element || !shouldAnimate()) {
    if (element) {
      gsap.set(element, { opacity: 1, scale: 1 })
    }
    return null
  }

  const {
    delay = 0,
    duration = GSAP_CONFIG.duration,
    scale = 0.8,
    trigger = element,
    start = 'top 85%',
  } = options

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: scale,
    },
    {
      opacity: 1,
      scale: 1,
      duration: duration,
      delay: delay,
      ease: GSAP_CONFIG.ease,
      scrollTrigger: {
        trigger: trigger,
        start: start,
        toggleActions: 'play none none none',
      },
    }
  )
}

/**
 * Animação stagger para múltiplos elementos
 */
export const staggerFadeInUp = (elements, options = {}) => {
  if (!elements || !shouldAnimate()) {
    if (elements) {
      gsap.set(elements, { opacity: 1, y: 0, scale: 1 })
    }
    return null
  }

  const {
    delay = 0,
    duration = GSAP_CONFIG.duration,
    stagger = GSAP_CONFIG.stagger,
    y = 50,
    scale = 1,
    trigger = elements[0] || elements,
    start = 'top 85%',
    useScrollTrigger = true,
  } = options

  const fromVars = { opacity: 0, y: y }
  const toVars = {
    opacity: 1,
    y: 0,
    duration: duration,
    delay: delay,
    stagger: stagger,
    ease: GSAP_CONFIG.ease,
  }

  // Adicionar scale se fornecido
  if (scale !== 1) {
    fromVars.scale = scale
    toVars.scale = 1
  }

  // Adicionar ScrollTrigger se disponível e solicitado
  if (useScrollTrigger && typeof window !== 'undefined') {
    toVars.scrollTrigger = {
      trigger: trigger,
      start: start,
      toggleActions: 'play none none none',
    }
  }

  return gsap.fromTo(elements, fromVars, toVars)
}

/**
 * Animação de texto (split text effect)
 */
export const textReveal = (element, options = {}) => {
  if (!element || !shouldAnimate()) {
    if (element) {
      gsap.set(element, { opacity: 1 })
    }
    return null
  }

  const {
    delay = 0,
    duration = GSAP_CONFIG.duration,
    trigger = element,
    start = 'top 85%',
  } = options

  // Dividir texto em palavras ou caracteres
  const text = element.textContent
  const words = text.split(' ')
  
  // Criar spans para cada palavra
  element.innerHTML = words
    .map((word) => `<span style="display: inline-block;">${word}</span>`)
    .join(' ')

  const wordSpans = element.querySelectorAll('span')

  return gsap.fromTo(
    wordSpans,
    {
      opacity: 0,
      y: 20,
      rotationX: -90,
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: duration,
      delay: delay,
      stagger: 0.05,
      ease: GSAP_CONFIG.ease,
      scrollTrigger: {
        trigger: trigger,
        start: start,
        toggleActions: 'play none none none',
      },
    }
  )
}

/**
 * Animação de parallax suave
 */
export const parallax = (element, options = {}) => {
  if (!element || !shouldAnimate()) {
    return null
  }

  const {
    speed = 0.5,
    trigger = element,
    start = 'top bottom',
    end = 'bottom top',
  } = options

  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger,
      start: start,
      end: end,
      scrub: true,
    },
  })
}

/**
 * Animação de float/flutuação contínua
 */
export const floatAnimation = (element, options = {}) => {
  if (!element || !shouldAnimate()) {
    return null
  }

  const {
    duration = 3,
    y = 20,
    rotation = 0,
    ease = 'sine.inOut',
  } = options

  return gsap.to(element, {
    y: y,
    rotation: rotation,
    duration: duration,
    ease: ease,
    repeat: -1,
    yoyo: true,
  })
}

/**
 * Animação de hover para botões
 */
export const buttonHover = (element) => {
  if (!element || !shouldAnimate()) return

  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: 1.05,
      y: -3,
      duration: 0.3,
      ease: 'power2.out',
    })
  })

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  })
}

/**
 * Limpar todas as animações GSAP
 */
export const cleanup = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
}

/**
 * Refresh ScrollTrigger (útil após mudanças no DOM)
 */
export const refreshScrollTrigger = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh()
  }
}

