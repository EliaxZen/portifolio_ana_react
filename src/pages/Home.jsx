import { useState, useEffect } from 'react'
import { PERSONAL_INFO } from '@/utils/constants'
import { scrollToElement } from '@/utils'
import ParallaxSection from '@/components/ParallaxSection'
import OrientalPattern from '@/components/OrientalPattern'
import AnimatedSection from '@/components/AnimatedSection'
import './Home.css'

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleClick = (e, elementId) => {
    e.preventDefault()
    scrollToElement(elementId)
  }

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
            <h1 className="home-title">
              Olá, eu sou <span className="highlight">{PERSONAL_INFO.name}</span>
            </h1>
            <p className="home-subtitle">{PERSONAL_INFO.title}</p>
            <p className="home-description">{PERSONAL_INFO.description}</p>
            <div className="home-buttons">
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
          <div className="geometric-shape shape-1"></div>
          <div className="geometric-shape shape-2"></div>
          <div className="geometric-shape shape-3"></div>
        </ParallaxSection>
      </div>
    </section>
  )
}

export default Home

