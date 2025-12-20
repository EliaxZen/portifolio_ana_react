import { useEffect, useRef } from 'react'
import { staggerFadeInUp, scaleIn } from '@/utils/gsapAnimations'
import ProjectCard from '@/components/ProjectCard'
import AnimatedSection from '@/components/AnimatedSection'
import './Projects.css'

function Projects() {
  const projectsGridRef = useRef(null)

  // Exemplos de projetos - substitua pelos projetos reais da Ana
  const projects = [
    {
      id: 1,
      title: 'Projeto Residencial Sustentável',
      description:
        'Projeto de residência unifamiliar com foco em sustentabilidade e eficiência energética, integrando elementos naturais e tecnologia.',
      tags: ['Residencial', 'Sustentável', 'AutoCAD'],
      link: '#',
    },
    {
      id: 2,
      title: 'Planejamento Urbano - Centro Comunitário',
      description:
        'Desenvolvimento de projeto de centro comunitário com espaços verdes e áreas de convivência para a comunidade local.',
      tags: ['Urbanismo', 'Comunitário', 'SketchUp'],
      link: '#',
    },
    {
      id: 3,
      title: 'Reforma de Espaço Comercial',
      description:
        'Modernização de espaço comercial com design contemporâneo, priorizando acessibilidade e funcionalidade.',
      tags: ['Comercial', 'Reforma', 'Revit'],
      link: '#',
    },
    {
      id: 4,
      title: 'Projeto de Habitação Social',
      description:
        'Desenvolvimento de projeto de habitação social com foco em qualidade de vida e sustentabilidade.',
      tags: ['Social', 'Habitacional', 'Sustentável'],
      link: '#',
    },
    {
      id: 5,
      title: 'Parque Urbano Sustentável',
      description:
        'Projeto de parque urbano com áreas de lazer, ciclovias e espaços verdes, promovendo qualidade de vida.',
      tags: ['Urbanismo', 'Parque', 'Sustentável'],
      link: '#',
    },
    {
      id: 6,
      title: 'Centro Cultural',
      description:
        'Projeto arquitetônico de centro cultural com espaços expositivos, auditório e áreas de interação.',
      tags: ['Cultural', 'Público', 'Design'],
      link: '#',
    },
  ]

  useEffect(() => {
    // Animação GSAP para os cards de projetos com stagger
    if (projectsGridRef.current) {
      const projectCards = projectsGridRef.current.querySelectorAll('.project-card')
      if (projectCards.length > 0) {
        staggerFadeInUp(projectCards, {
          delay: 0.2,
          stagger: 0.1,
          y: 50,
          scale: 0.95,
          trigger: projectsGridRef.current,
        })
      }
    }
  }, [])

  return (
    <section id="projetos" className="projects">
      <div className="projects-container">
        <AnimatedSection>
          <div className="projects-header">
            <h2 className="section-title">Meus Projetos</h2>
            <div className="title-underline"></div>
            <p className="projects-subtitle">
              Explore alguns dos meus trabalhos em arquitetura e urbanismo
            </p>
          </div>
        </AnimatedSection>

        <div ref={projectsGridRef} className="projects-grid">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 100}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

