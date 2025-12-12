import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react'
import { gsap } from 'gsap'
import { PERSONAL_INFO } from '@/utils/constants'
import { scrollToElement } from '@/utils'
import { rafThrottle, isLowEndDevice } from '@/utils/performance'
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

  // Animações GSAP otimizadas
  useEffect(() => {
    // PRIMEIRO: Garantir visibilidade inicial de TODOS os elementos SEMPRE usando style direto
    const ensureVisibility = () => {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1'
        titleRef.current.style.visibility = 'visible'
        titleRef.current.style.display = 'block'
        titleRef.current.style.transform = 'translateY(0)'
      }
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = '1'
        subtitleRef.current.style.visibility = 'visible'
        subtitleRef.current.style.display = 'block'
        subtitleRef.current.style.transform = 'translateY(0)'
      }
      if (descriptionRef.current) {
        descriptionRef.current.style.opacity = '1'
        descriptionRef.current.style.visibility = 'visible'
        descriptionRef.current.style.display = 'block'
        descriptionRef.current.style.transform = 'translateY(0)'
      }
      if (buttonsRef.current) {
        Array.from(buttonsRef.current.children).forEach(btn => {
          btn.style.opacity = '1'
          btn.style.visibility = 'visible'
          btn.style.display = 'block'
          btn.style.transform = 'translateY(0) scale(1)'
        })
      }
      shapesRef.current.forEach(shape => {
        if (shape) {
          shape.style.opacity = isLowEnd ? '0.3' : '1'
          shape.style.visibility = 'visible'
          shape.style.display = 'block'
          shape.style.transform = 'translateY(0) scale(1) rotate(0deg)'
        }
      })
    }

    // Garantir visibilidade imediatamente
    ensureVisibility()

    // Pular animações em dispositivos de baixa performance
    if (isLowEnd) {
      return
    }

    // Pequeno delay para garantir que os elementos estão renderizados
    let timeoutId = null

    timeoutId = setTimeout(() => {
      // Garantir visibilidade novamente antes das animações
      ensureVisibility()

      // Aplicar will-change apenas se não for low-end
      if (titleRef.current) gsap.set(titleRef.current, { willChange: 'transform, opacity' })
      if (subtitleRef.current) gsap.set(subtitleRef.current, { willChange: 'transform, opacity' })
      if (descriptionRef.current) gsap.set(descriptionRef.current, { willChange: 'transform, opacity' })
      if (buttonsRef.current) {
        Array.from(buttonsRef.current.children).forEach(btn => {
          gsap.set(btn, { willChange: 'transform' })
        })
      }
      shapesRef.current.forEach(shape => {
        if (shape) gsap.set(shape, { willChange: 'transform' })
      })

      const tl = gsap.timeline({ paused: false })

      // Animação do título - usar to() ao invés de from() para não esconder
      if (titleRef.current) {
        gsap.set(titleRef.current, { y: 50, opacity: 0 })
        tl.to(titleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          force3D: true
        })
      }

      // Animação do subtítulo
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { y: 30, opacity: 0 })
        tl.to(subtitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true
        }, '-=0.5')
      }

      // Animação da descrição
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, { y: 30, opacity: 0 })
        tl.to(descriptionRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true
        }, '-=0.4')
      }

      // Animação dos botões
      if (buttonsRef.current) {
        Array.from(buttonsRef.current.children).forEach(btn => {
          gsap.set(btn, { y: 30, opacity: 0 })
        })
        tl.to(buttonsRef.current.children, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          force3D: true
        }, '-=0.3')
      }

      // Animação das formas geométricas
      const shapeCount = shapesRef.current.length
      shapesRef.current.slice(0, shapeCount).forEach((shape, index) => {
        if (shape) {
          gsap.set(shape, { scale: 0, rotation: Math.random() * 360, opacity: 0 })
          gsap.to(shape, {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1,
            delay: 0.5 + index * 0.2,
            ease: 'back.out(1.7)',
            force3D: true
          })

          // Animação contínua flutuante
          gsap.to(shape, {
            y: '+=30',
            rotation: '+=360',
            duration: 4 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1 + index * 0.2,
            force3D: true
          })
        }
      })

      // Animação de hover nos botões
      if (buttonsRef.current) {
        Array.from(buttonsRef.current.children).forEach((btn) => {
          const handleMouseEnter = () => {
            gsap.to(btn, {
              scale: 1.05,
              y: -5,
              duration: 0.3,
              ease: 'power2.out',
              force3D: true
            })
          }

          const handleMouseLeave = () => {
            gsap.to(btn, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
              force3D: true
            })
          }

          btn.addEventListener('mouseenter', handleMouseEnter)
          btn.addEventListener('mouseleave', handleMouseLeave)
        })
      }
    }, 100)

    // Cleanup geral
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      // Limpar event listeners dos botões
      if (buttonsRef.current) {
        Array.from(buttonsRef.current.children).forEach((btn) => {
          gsap.killTweensOf(btn)
        })
      }
      shapesRef.current.forEach(shape => {
        if (shape) gsap.killTweensOf(shape)
      })
    }
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
