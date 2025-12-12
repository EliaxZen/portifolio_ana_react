import './Home.css'

function Home() {
  return (
    <section id="home" className="home">
      <div className="home-content">
        <h1>Olá, eu sou Ana</h1>
        <p className="home-subtitle">Desenvolvedora Front-end</p>
        <p className="home-description">
          Bem-vindo ao meu portfólio! Aqui você encontrará meus projetos e
          experiências.
        </p>
        <div className="home-buttons">
          <a href="#projetos" className="btn btn-primary">
            Ver Projetos
          </a>
          <a href="#contato" className="btn btn-secondary">
            Entre em Contato
          </a>
        </div>
      </div>
    </section>
  )
}

export default Home

