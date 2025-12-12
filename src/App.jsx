import Header from './components/Header'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <main className="App-main">
        <section id="sobre" className="section">
          <h2>Sobre</h2>
          <p>Adicione informações sobre você aqui.</p>
        </section>
        <section id="projetos" className="section">
          <h2>Projetos</h2>
          <p>Adicione seus projetos aqui.</p>
        </section>
        <section id="contato" className="section">
          <h2>Contato</h2>
          <p>Adicione suas informações de contato aqui.</p>
        </section>
      </main>
    </div>
  )
}

export default App

