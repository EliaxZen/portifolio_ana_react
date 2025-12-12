import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import OrientalDecoration from './components/OrientalDecoration'
import WaterWaves from './components/WaterWaves'
import SakuraLeaves from './components/SakuraLeaves'
import Toast from './components/Toast'
import { useToast } from './hooks/useToast'
import './App.css'

function App() {
  const { toasts, showToast, removeToast } = useToast()

  return (
    <div className="App">
      <OrientalDecoration />
      <WaterWaves />
      <SakuraLeaves count={20} />
      <ScrollProgress />
      <Header />
      <Home />
      <About />
      <Projects />
      <Contact showToast={showToast} />
      <Footer />
      <BackToTop />
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>
  )
}

export default App

