import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { PERSONAL_INFO } from '@/utils/constants'
import AnimatedSection from '@/components/AnimatedSection'
import './About.css'

function About() {
  const skillsRef = useRef([])
  const educationRef = useRef(null)
  const skillsContainerRef = useRef(null)

  const skills = [
    'Design Arquitetônico',
    'Planejamento Urbano',
    'AutoCAD',
    'SketchUp',
    'Revit',
    'Photoshop',
    'Sustentabilidade',
    'Maquetes',
  ]

  useEffect(() => {
    // Garantir visibilidade inicial SEMPRE
    skillsRef.current.forEach(skill => {
      if (skill) {
        gsap.set(skill, { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          rotation: 0,
          visibility: 'visible',
          display: 'block'
        })
      }
    })
    if (educationRef.current) {
      gsap.set(educationRef.current, { 
        opacity: 1, 
        x: 0,
        visibility: 'visible',
        display: 'block'
      })
    }

    // Observer para animações quando elementos entram na viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animação dos skills com stagger - usar to() ao invés de from()
            if (entry.target === skillsContainerRef.current && skillsRef.current.length > 0) {
              skillsRef.current.forEach(skill => {
                if (skill) {
                  gsap.set(skill, { scale: 0, opacity: 0 })
                }
              })
              gsap.to(skillsRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)'
              })
            }

            // Animação do card de educação - usar to() ao invés de from()
            if (entry.target === educationRef.current) {
              gsap.set(educationRef.current, { x: -50, opacity: 0 })
              gsap.to(educationRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
              })
            }

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (skillsContainerRef.current) {
      observer.observe(skillsContainerRef.current)
    }
    if (educationRef.current) {
      observer.observe(educationRef.current)
    }

    // Hover animations nos skills
    const cleanupFunctions = []
    skillsRef.current.forEach((skill) => {
      if (!skill) return
      
      const handleMouseEnter = () => {
        gsap.to(skill, {
          scale: 1.1,
          y: -5,
          rotation: 2,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      const handleMouseLeave = () => {
        gsap.to(skill, {
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      skill.addEventListener('mouseenter', handleMouseEnter)
      skill.addEventListener('mouseleave', handleMouseLeave)

      cleanupFunctions.push(() => {
        skill.removeEventListener('mouseenter', handleMouseEnter)
        skill.removeEventListener('mouseleave', handleMouseLeave)
      })
    })

    return () => {
      observer.disconnect()
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [])

  return (
    <section id="sobre" className="about">
      <div className="about-container">
        <AnimatedSection>
          <div className="about-header">
            <h2 className="section-title">Sobre Mim</h2>
            <div className="title-underline"></div>
          </div>
        </AnimatedSection>

        <div className="about-content">
          <AnimatedSection delay={200}>
            <div className="about-text">
              <div className="about-intro">
                <h3>Olá! Eu sou a {PERSONAL_INFO.name}</h3>
                <p className="about-description">
                  {PERSONAL_INFO.description}
                </p>
                <p>
                  Atualmente curso <strong>Arquitetura e Urbanismo</strong> no{' '}
                  <strong>{PERSONAL_INFO.university}</strong>, onde tenho a
                  oportunidade de explorar minha paixão por criar espaços que
                  harmonizam funcionalidade, estética e sustentabilidade.
                </p>
                <p>
                  Acredito que a arquitetura vai além de construir edifícios - é
                  sobre criar ambientes que melhoram a qualidade de vida das
                  pessoas e respeitam o meio ambiente. Meu objetivo é desenvolver
                  projetos inovadores que integrem design contemporâneo com
                  práticas sustentáveis.
                </p>
              </div>

              <div ref={educationRef} className="about-education">
                <h4>Formação</h4>
                <div className="education-item">
                  <div className="education-icon">🎓</div>
                  <div>
                    <h5>Arquitetura e Urbanismo</h5>
                    <p>{PERSONAL_INFO.university}</p>
                    <span className="education-status">Em andamento</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="about-skills">
              <h4>Competências</h4>
            <div ref={skillsContainerRef} className="skills-grid">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  ref={(el) => (skillsRef.current[index] = el)}
                  className="skill-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="skill-icon">✨</span>
                  <span className="skill-text">{skill}</span>
                </div>
              ))}
            </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default About

