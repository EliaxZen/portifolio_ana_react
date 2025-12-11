import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Portfólio Ana</h1>
        <p>Bem-vindo ao seu portfólio!</p>
        <button onClick={() => setCount((count) => count + 1)}>
          Contador: {count}
        </button>
      </header>
    </div>
  )
}

export default App

