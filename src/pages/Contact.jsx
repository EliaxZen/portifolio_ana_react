import { useState } from 'react'
import { SOCIAL_LINKS } from '@/utils/constants'
import './Contact.css'

function Contact({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

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

  return (
    <section id="contato" className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="section-title">Entre em Contato</h2>
          <div className="title-underline"></div>
          <p className="contact-subtitle">
            Vamos conversar sobre seu próximo projeto arquitetônico!
          </p>
        </div>

        <div className="contact-content">
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

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
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
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Conte-me sobre seu projeto..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

