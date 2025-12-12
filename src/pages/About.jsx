import { PERSONAL_INFO } from '@/utils/constants'
import AnimatedSection from '@/components/AnimatedSection'
import './About.css'

function About() {
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

              <div className="about-education">
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
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  {skill}
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

