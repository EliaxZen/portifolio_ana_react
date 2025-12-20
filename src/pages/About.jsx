import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PERSONAL_INFO } from '@/utils/constants'
import { staggerFadeInUp, fadeInUp, scaleIn } from '@/utils/gsapAnimations'
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
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Animação GSAP para skills com stagger
    const skills = skillsRef.current.filter(Boolean)
    if (skills.length > 0 && skillsContainerRef.current) {
      staggerFadeInUp(skills, {
        delay: 0.2,
        stagger: 0.08,
        y: 30,
        trigger: skillsContainerRef.current,
      })

    }

    // Animação para educação
    if (educationRef.current) {
      scaleIn(educationRef.current, {
        delay: 0.3,
        trigger: educationRef.current,
      })
    }

    // Garantir visibilidade inicial (fallback)
    skillsRef.current.forEach(skill => {
      if (skill) {
        skill.style.opacity = '1'
        skill.style.visibility = 'visible'
      }
    })
    if (educationRef.current) {
      educationRef.current.style.opacity = '1'
      educationRef.current.style.visibility = 'visible'
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

