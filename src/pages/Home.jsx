import { PERSONAL_INFO } from '@/utils/constants'
import { scrollToElement } from '@/utils'
import ParallaxSection from '@/components/ParallaxSection'
import OrientalPattern from '@/components/OrientalPattern'
import './Home.css'

function Home() {
  const handleClick = (e, elementId) => {
    e.preventDefault()
    scrollToElement(elementId)
  }

  return (
    <section id="home" className="home">
      <div className="home-background"></div>
      <OrientalPattern type="waves" />
      <div className="home-content">
        <div className="home-text">
          <h1 className="home-title">
            Olá, eu sou <span className="highlight">{PERSONAL_INFO.name}</span>
          </h1>
          <p className="home-subtitle">{PERSONAL_INFO.title}</p>
          <p className="home-description">{PERSONAL_INFO.description}</p>
          <div className="home-buttons">
            <a
              href="#projetos"
              className="btn btn-primary"
              onClick={(e) => handleClick(e, 'projetos')}
            >
              Ver Projetos
            </a>
            <a
              href="#contato"
              className="btn btn-secondary"
              onClick={(e) => handleClick(e, 'contato')}
            >
              Entre em Contato
            </a>
          </div>
        </div>
        <ParallaxSection speed={0.3} className="home-visual">
          <div className="geometric-shape shape-1"></div>
          <div className="geometric-shape shape-2"></div>
          <div className="geometric-shape shape-3"></div>
        </ParallaxSection>
      </div>
    </section>
  )
}

export default Home

