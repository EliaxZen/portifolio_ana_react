import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SOCIAL_LINKS } from '@/utils/constants'
import AnimatedSection from '@/components/AnimatedSection'
import './Contact.css'

function Contact({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const formRef = useRef(null)
  const inputsRef = useRef([])
  const submitBtnRef = useRef(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      if (showToast) {
        showToast('Por favor, preencha todos os campos.', 'error')
      }
      return
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      if (showToast) {
        showToast('Por favor, insira um email válido.', 'error')
      }
      return
    }
    
    // Simulação de envio (substitua pela lógica real)
    if (showToast) {
      showToast('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success')
    }
    
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  useEffect(() => {
    // Garantir visibilidade inicial SEMPRE
    inputsRef.current.forEach(input => {
      if (input) {
        gsap.set(input, { 
          opacity: 1, 
          x: 0, 
          scale: 1, 
          y: 0,
          visibility: 'visible',
          display: 'block'
        })
      }
    })
    if (submitBtnRef.current) {
      gsap.set(submitBtnRef.current, { 
        opacity: 1, 
        scale: 1, 
        rotation: 0,
        visibility: 'visible',
        display: 'block'
      })
    }

    // Animação dos inputs quando entram na viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Usar to() ao invés de from() para não esconder
            inputsRef.current.filter(Boolean).forEach(input => {
              if (input) gsap.set(input, { x: -30, opacity: 0 })
            })
            gsap.to(inputsRef.current.filter(Boolean), {
              x: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out'
            })

            if (submitBtnRef.current) {
              gsap.set(submitBtnRef.current, { scale: 0, rotation: -180, opacity: 0 })
              gsap.to(submitBtnRef.current, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.4,
                ease: 'back.out(1.7)'
              })
            }

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (formRef.current) {
      observer.observe(formRef.current)
    }

    // Animação de focus nos inputs
    const cleanupFunctions = []
    inputsRef.current.forEach((input) => {
      if (!input) return

      const handleFocus = () => {
        gsap.to(input, {
          scale: 1.02,
          y: -2,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      const handleBlur = () => {
        gsap.to(input, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      input.addEventListener('focus', handleFocus)
      input.addEventListener('blur', handleBlur)

      cleanupFunctions.push(() => {
        input.removeEventListener('focus', handleFocus)
        input.removeEventListener('blur', handleBlur)
      })
    })

    return () => {
      observer.disconnect()
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [])

  return (
    <section id="contato" className="contact">
      <div className="contact-container">
        <AnimatedSection>
          <div className="contact-header">
            <h2 className="section-title">Entre em Contato</h2>
            <div className="title-underline"></div>
            <p className="contact-subtitle">
              Vamos conversar sobre seu próximo projeto arquitetônico!
            </p>
          </div>
        </AnimatedSection>

        <div className="contact-content">
          <AnimatedSection delay={200}>
            <div className="contact-info">
            <h3>Vamos trabalhar juntos?</h3>
            <p>
              Estou sempre aberta a novos projetos e oportunidades. Se você tem
              uma ideia ou projeto em mente, adoraria ouvir sobre isso!
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <a href={`mailto:${SOCIAL_LINKS.email}`}>
                    {SOCIAL_LINKS.email}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">🏛️</div>
                <div>
                  <h4>Localização</h4>
                  <p>Brasília, DF - Brasil</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h4>Redes Sociais</h4>
              <div className="social-icons">
                {SOCIAL_LINKS.instagram && (
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Instagram"
                  >
                    📷 Instagram
                  </a>
                )}
                {SOCIAL_LINKS.linkedin && (
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="LinkedIn"
                  >
                    💼 LinkedIn
                  </a>
                )}
                {SOCIAL_LINKS.behance && (
                  <a
                    href={SOCIAL_LINKS.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Behance"
                  >
                    🎨 Behance
                  </a>
                )}
              </div>
            </div>
          </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                ref={(el) => (inputsRef.current[0] = el)}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Seu nome"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                ref={(el) => (inputsRef.current[1] = el)}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Assunto</label>
              <input
                ref={(el) => (inputsRef.current[2] = el)}
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Assunto da mensagem"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea
                ref={(el) => (inputsRef.current[3] = el)}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Conte-me sobre seu projeto..."
              ></textarea>
            </div>

            <button ref={submitBtnRef} type="submit" className="submit-btn">
              <span>Enviar Mensagem</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3333 1.66667L9.16667 10.8333M18.3333 1.66667L12.5 18.3333L9.16667 10.8333M18.3333 1.66667L1.66667 7.5L9.16667 10.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default Contact

