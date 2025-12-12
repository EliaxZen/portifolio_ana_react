import { SITE_NAME, SOCIAL_LINKS } from '@/utils/constants'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{SITE_NAME}</h3>
            <p>Arquitetura e Urbanismo com paixão e dedicação.</p>
          </div>

          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li>
                <a href="#home">Início</a>
              </li>
              <li>
                <a href="#sobre">Sobre</a>
              </li>
              <li>
                <a href="#projetos">Projetos</a>
              </li>
              <li>
                <a href="#contato">Contato</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Redes Sociais</h4>
            <div className="footer-social">
              {SOCIAL_LINKS.instagram && (
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  📷
                </a>
              )}
              {SOCIAL_LINKS.linkedin && (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  💼
                </a>
              )}
              {SOCIAL_LINKS.behance && (
                <a
                  href={SOCIAL_LINKS.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Behance"
                >
                  🎨
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {SITE_NAME}. Todos os direitos reservados.
          </p>
          <p className="footer-made">
            Feito com ❤️ para Ana
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

