import { scrollToElement } from '@/utils'
import './Header.css'

function Header() {
  const handleNavClick = (e, elementId) => {
    e.preventDefault()
    scrollToElement(elementId)
  }

  return (
    <header className="header">
      <h1>Portfólio Ana</h1>
      <nav>
        <a href="#sobre" onClick={(e) => handleNavClick(e, 'sobre')}>
          Sobre
        </a>
        <a href="#projetos" onClick={(e) => handleNavClick(e, 'projetos')}>
          Projetos
        </a>
        <a href="#contato" onClick={(e) => handleNavClick(e, 'contato')}>
          Contato
        </a>
      </nav>
    </header>
  )
}

export default Header

