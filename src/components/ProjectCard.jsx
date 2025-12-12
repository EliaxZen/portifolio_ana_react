import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
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

    // Garantir visibilidade inicial SEMPRE
    gsap.set(card, { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      visibility: 'visible',
      display: 'block'
    })
    if (overlay) {
      gsap.set(overlay, { 
        opacity: 0,
        visibility: 'visible',
        display: 'flex'
      })
    }
    if (link) {
      gsap.set(link, { 
        opacity: 1, 
        scale: 1, 
        rotation: 0,
        visibility: 'visible',
        display: 'block'
      })
    }

    // Observer para animação quando card entra na viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Usar to() ao invés de from() para não esconder
            gsap.set(card, { y: 50, opacity: 0 })
            gsap.to(card, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out'
            })
            observer.unobserve(card)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(card)

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out'
      })

      if (overlay) {
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      if (link) {
        gsap.set(link, { scale: 0, rotation: -180, opacity: 0 })
        gsap.to(link, {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      })

      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      observer.disconnect()
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
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

