import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import koiSvg from '@/assets/koi.svg'
import './PageLoader.css'

function PageLoader({ onComplete }) {
  const loaderRef = useRef(null)
  const koiRef = useRef(null)
  const textRef = useRef(null)
  const progressRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const loader = loaderRef.current
    const koi = koiRef.current
    const text = textRef.current
    const progressBar = progressRef.current

    if (!loader || !koi || !text) return

    // Prevenir scroll do body quando loader está ativo
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    // Animação inicial
    const tl = gsap.timeline()

    // Fade in do loader
    tl.from(loader, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    })

    // Animação da carpa girando
    gsap.to(koi, {
      rotation: -360,
      duration: 2,
      ease: 'none',
      repeat: -1,
    })

    // Animação do texto
    tl.from(text, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3')

    // Animação da barra de progresso
    const progressTl = gsap.timeline({ repeat: 0 })
    
    // Simular progresso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Animação da barra de progresso
    progressTl.to(progressBar, {
      width: '100%',
      duration: 2,
      ease: 'power2.out',
    })

    // Quando completar, animar saída
    const completeTimeout = setTimeout(() => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete()
        },
      })

      exitTl.to([koi, text, progressBar], {
        opacity: 0,
        y: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.in',
      })

      exitTl.to(loader, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          // Restaurar scroll após animação
          document.body.style.overflow = ''
          document.documentElement.style.overflow = ''
        },
      }, '-=0.3')
    }, 2500)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(completeTimeout)
      // Garantir que o scroll seja restaurado
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div ref={loaderRef} className="page-loader" aria-label="Carregando página">
      <div className="loader-content">
        <div ref={koiRef} className="loader-koi">
          <img src={koiSvg} alt="Koi" className="koi-image" />
        </div>
        <h2 ref={textRef} className="loader-text">Ana - Koi</h2>
        <div className="loader-progress-container">
          <div ref={progressRef} className="loader-progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}

export default PageLoader

