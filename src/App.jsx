import { lazy, Suspense, memo } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import Toast from './components/Toast'
import { useToast } from './hooks/useToast'
import './App.css'

// Lazy load de componentes pesados
const OrientalDecoration = lazy(() => import('./components/OrientalDecoration'))
const WaterWaves = lazy(() => import('./components/WaterWaves'))
const SakuraLeaves = lazy(() => import('./components/SakuraLeaves'))

// Componente de loading mínimo
const LazyLoader = () => null

function App() {
  const { toasts, showToast, removeToast } = useToast()

  return (
    <div className="App">
      <Suspense fallback={<LazyLoader />}>
        <OrientalDecoration />
        <WaterWaves />
        <SakuraLeaves count={20} />
      </Suspense>
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

export default memo(App)

