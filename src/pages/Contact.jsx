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

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    
    // Validação em tempo real
    if (touched[name]) {
      validateField(name, value)
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched({ ...touched, [name]: true })
    validateField(name, value)
  }

  const validateField = (name, value) => {
    const newErrors = { ...errors }
    
    if (!value.trim()) {
      newErrors[name] = 'Este campo é obrigatório'
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        newErrors[name] = 'Email inválido'
      } else {
        delete newErrors[name]
      }
    } else {
      delete newErrors[name]
    }
    
    setErrors(newErrors)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Marcar todos os campos como tocados
    const allTouched = {
      name: true,
      email: true,
      subject: true,
      message: true
    }
    setTouched(allTouched)
    
    // Validar todos os campos
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key])
      if (!formData[key].trim()) {
        newErrors[key] = 'Este campo é obrigatório'
      }
    })
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    setErrors(newErrors)
    
    // Se houver erros, não enviar
    if (Object.keys(newErrors).length > 0) {
      if (showToast) {
        showToast('Por favor, corrija os erros no formulário.', 'error')
      }
      return
    }
    
    // Simulação de envio (substitua pela lógica real)
    if (showToast) {
      showToast('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success')
    }
    
    setFormData({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setTouched({})
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
                onBlur={handleBlur}
                required
                placeholder="Seu nome"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && touched.name && (
                <span id="name-error" className="form-error" role="alert">
                  {errors.name}
                </span>
              )}
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
                onBlur={handleBlur}
                required
                placeholder="seu@email.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && touched.email && (
                <span id="email-error" className="form-error" role="alert">
                  {errors.email}
                </span>
              )}
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
                onBlur={handleBlur}
                required
                placeholder="Assunto da mensagem"
                aria-invalid={errors.subject ? 'true' : 'false'}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
              />
              {errors.subject && touched.subject && (
                <span id="subject-error" className="form-error" role="alert">
                  {errors.subject}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea
                ref={(el) => (inputsRef.current[3] = el)}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                rows="6"
                placeholder="Conte-me sobre seu projeto..."
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              ></textarea>
              {errors.message && touched.message && (
                <span id="message-error" className="form-error" role="alert">
                  {errors.message}
                </span>
              )}
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

