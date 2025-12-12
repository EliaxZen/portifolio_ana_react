import './ProjectCard.css'

function ProjectCard({ project }) {
  const handleLinkClick = (e) => {
    if (project.link === '#' || !project.link) {
      e.preventDefault()
    }
  }

  return (
    <div className="project-card">
      <div className="project-image">
        <div className="project-placeholder">
          <span className="placeholder-icon" aria-hidden="true">🏗️</span>
          <span className="placeholder-text">Imagem do Projeto</span>
        </div>
        <div className="project-overlay">
          <a 
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

