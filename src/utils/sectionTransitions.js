// Utilitários para transições entre seções
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Cria transição suave entre seções ao fazer scroll
 */
export const initSectionTransitions = () => {
  if (typeof window === 'undefined') return

  const sections = document.querySelectorAll('section[id]')

  sections.forEach((section, index) => {
    // Animação de entrada da seção
    gsap.fromTo(section,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Animação de parallax para elementos dentro da seção
    const parallaxElements = section.querySelectorAll('.parallax-element')
    parallaxElements.forEach((element, elIndex) => {
      gsap.to(element, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  })
}

/**
 * Animação de fade in para seções
 */
export const fadeInSection = (section, options = {}) => {
  const {
    delay = 0,
    duration = 1,
    y = 50,
  } = options

  return gsap.fromTo(section,
    {
      opacity: 0,
      y: y,
    },
    {
      opacity: 1,
      y: 0,
      duration: duration,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Animação de slide in para seções
 */
export const slideInSection = (section, direction = 'left', options = {}) => {
  const {
    delay = 0,
    duration = 1,
    distance = 100,
  } = options

  const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0
  const y = direction === 'up' ? -distance : direction === 'down' ? distance : 0

  return gsap.fromTo(section,
    {
      opacity: 0,
      x: x,
      y: y,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: duration,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Animação de scale in para seções
 */
export const scaleInSection = (section, options = {}) => {
  const {
    delay = 0,
    duration = 1,
    scale = 0.8,
  } = options

  return gsap.fromTo(section,
    {
      opacity: 0,
      scale: scale,
    },
    {
      opacity: 1,
      scale: 1,
      duration: duration,
      delay: delay,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

