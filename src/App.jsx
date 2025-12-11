import { useState } from 'react'
import Header from './components/Header'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <h2>Bem-vindo ao seu portfólio!</h2>
        <p>Este é um projeto React configurado e pronto para desenvolvimento.</p>
        <button onClick={() => setCount((count) => count + 1)}>
          Contador: {count}
        </button>
      </main>
    </div>
  )
}

export default App

