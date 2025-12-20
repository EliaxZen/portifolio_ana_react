import { lazy, Suspense, memo, useState, useEffect } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import Toast from './components/Toast'
import PageLoader from './components/PageLoader'
import { useToast } from './hooks/useToast'
import './App.css'

// Lazy load de componentes pesados
const OrientalDecoration = lazy(() => import('./components/OrientalDecoration'))
const WaterWaves = lazy(() => import('./components/WaterWaves'))

// Componente de loading mínimo
const LazyLoader = () => null

function App() {
  const { toasts, showToast, removeToast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Garantir que o loader apareça por pelo menos 1.5s
    const minLoadTime = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(minLoadTime)
  }, [])


  const handleLoaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <PageLoader onComplete={handleLoaderComplete} />}
      <div className="App" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Suspense fallback={<LazyLoader />}>
          <OrientalDecoration />
          <WaterWaves />
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
    </>
  )
}

export default memo(App)

