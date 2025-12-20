import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react'
import { PERSONAL_INFO } from '@/utils/constants'
import { scrollToElement } from '@/utils'
import { rafThrottle, isLowEndDevice } from '@/utils/performance'
import { fadeInUp, textReveal, staggerFadeInUp, floatAnimation, buttonHover } from '@/utils/gsapAnimations'
import ParallaxSection from '@/components/ParallaxSection'
import OrientalPattern from '@/components/OrientalPattern'
import AnimatedSection from '@/components/AnimatedSection'
import './Home.css'

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const shapesRef = useRef([])
  const isLowEnd = useMemo(() => isLowEndDevice(), [])

  // Throttle do mouse move para melhor performance
  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    })
  }, [])

  // Throttled version
  const throttledMouseMove = useMemo(
    () => rafThrottle(handleMouseMove),
    [handleMouseMove]
  )

  useEffect(() => {
    window.addEventListener('mousemove', throttledMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', throttledMouseMove)
  }, [throttledMouseMove])

  // Animações GSAP
  useEffect(() => {
    // Animação do título
    if (titleRef.current) {
      fadeInUp(titleRef.current, { delay: 0.2, y: 60 })
    }

    // Animação do subtítulo
    if (subtitleRef.current) {
      fadeInUp(subtitleRef.current, { delay: 0.4, y: 40 })
    }

    // Animação da descrição
    if (descriptionRef.current) {
      fadeInUp(descriptionRef.current, { delay: 0.6, y: 40 })
    }

    // Animação dos botões com stagger
    if (buttonsRef.current) {
      const buttons = Array.from(buttonsRef.current.children)
      staggerFadeInUp(buttons, { delay: 0.8, stagger: 0.15, y: 30 })
      
      // Adicionar hover animation aos botões
      buttons.forEach(button => {
        buttonHover(button)
      })
    }

    // Animações das formas geométricas
    shapesRef.current.forEach((shape, index) => {
      if (shape) {
        // Float animation com delays diferentes
        floatAnimation(shape, {
          duration: 3 + index,
          y: 20 + index * 10,
          rotation: (index % 2 === 0 ? 1 : -1) * (5 + index * 2),
        })
      }
    })

    // Garantir visibilidade inicial (fallback)
    const ensureVisibility = () => {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1'
        titleRef.current.style.visibility = 'visible'
      }
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = '1'
        subtitleRef.current.style.visibility = 'visible'
      }
      if (descriptionRef.current) {
        descriptionRef.current.style.opacity = '1'
        descriptionRef.current.style.visibility = 'visible'
      }
      if (buttonsRef.current) {
        Array.from(buttonsRef.current.children).forEach(btn => {
          btn.style.opacity = '1'
          btn.style.visibility = 'visible'
        })
      }
      shapesRef.current.forEach(shape => {
        if (shape) {
          shape.style.opacity = isLowEnd ? '0.3' : '1'
          shape.style.visibility = 'visible'
        }
      })
    }
    ensureVisibility()
  }, [isLowEnd])

  const handleClick = useCallback((e, elementId) => {
    e.preventDefault()
    scrollToElement(elementId)
  }, [])

  return (
    <section id="home" className="home">
      <div className="home-background"></div>
      <OrientalPattern type="waves" />
      <div 
        className="home-content"
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
        }}
      >
        <AnimatedSection>
          <div className="home-text">
            <h1 ref={titleRef} className="home-title">
              Olá, eu sou <span className="highlight">{PERSONAL_INFO.name}</span>
            </h1>
            <p ref={subtitleRef} className="home-subtitle">{PERSONAL_INFO.title}</p>
            <p ref={descriptionRef} className="home-description">{PERSONAL_INFO.description}</p>
            <div ref={buttonsRef} className="home-buttons">
              <a
                href="#projetos"
                className="btn btn-primary"
                onClick={(e) => handleClick(e, 'projetos')}
                aria-label="Ver meus projetos"
              >
                <span>Ver Projetos</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#contato"
                className="btn btn-secondary"
                onClick={(e) => handleClick(e, 'contato')}
                aria-label="Entre em contato"
              >
                <span>Entre em Contato</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6.66667L10 11.6667L17.5 6.66667M3.33333 15H16.6667C17.5871 15 18.3333 14.2538 18.3333 13.3333V6.66667C18.3333 5.74619 17.5871 5 16.6667 5H3.33333C2.41286 5 1.66667 5.74619 1.66667 6.66667V13.3333C1.66667 14.2538 2.41286 15 3.33333 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </AnimatedSection>
        <ParallaxSection speed={0.3} className="home-visual">
          <div ref={(el) => (shapesRef.current[0] = el)} className="geometric-shape shape-1"></div>
          <div ref={(el) => (shapesRef.current[1] = el)} className="geometric-shape shape-2"></div>
          <div ref={(el) => (shapesRef.current[2] = el)} className="geometric-shape shape-3"></div>
        </ParallaxSection>
      </div>
    </section>
  )
}

export default memo(Home)
