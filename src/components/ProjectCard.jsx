import { useEffect, useRef } from 'react'
import './ProjectCard.css'

function ProjectCard({ project }) {
  const cardRef = useRef(null)
  const overlayRef = useRef(null)
  const linkRef = useRef(null)

  const handleLinkClick = (e) => {
    if (project.link === '#' || !project.link) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current
    const overlay = overlayRef.current
    const link = linkRef.current

    // Garantir visibilidade inicial
    card.style.opacity = '1'
    card.style.visibility = 'visible'
    if (overlay) {
      overlay.style.opacity = '0'
      overlay.style.visibility = 'visible'
    }
    if (link) {
      link.style.opacity = '1'
      link.style.visibility = 'visible'
    }
  }, [])

  return (
    <div ref={cardRef} className="project-card">
      <div className="project-image">
        <div className="project-placeholder">
          <span className="placeholder-icon" aria-hidden="true">🏗️</span>
          <span className="placeholder-text">Imagem do Projeto</span>
        </div>
        <div ref={overlayRef} className="project-overlay">
          <a 
            ref={linkRef}
            href={project.link || '#'} 
            className="project-link" 
            target={project.link && project.link !== '#' ? '_blank' : undefined}
            rel={project.link && project.link !== '#' ? 'noopener noreferrer' : undefined}
            onClick={handleLinkClick}
            aria-label={`Ver detalhes do projeto ${project.title}`}
          >
            Ver Detalhes
          </a>
        </div>
      </div>
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard

