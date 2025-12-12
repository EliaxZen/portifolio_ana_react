import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './KoiFish.css'

function KoiFish({ count = 2 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.innerHTML = ''
    const fishes = []
    const allAnimations = [] // Armazenar animações para cleanup

    // Criar carpas
    for (let i = 0; i < Math.min(count, 3); i++) {
      const fish = document.createElement('div')
      fish.className = 'koi-fish'
      
      // SVG simplificado de carpa Koi
      fish.innerHTML = `
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bodyGrad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#C62828;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#E53935;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#B71C1C;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="goldGrad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFD54F;stop-opacity:0.9" />
              <stop offset="100%" style="stop-color:#F9A825;stop-opacity:0.8" />
            </linearGradient>
            <filter id="glow${i}">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Corpo -->
          <ellipse cx="50" cy="50" rx="45" ry="25" fill="url(#bodyGrad${i})" filter="url(#glow${i})"/>
          
          <!-- Cabeça -->
          <ellipse cx="20" cy="50" rx="18" ry="20" fill="url(#bodyGrad${i})"/>
          
          <!-- Olho -->
          <circle cx="15" cy="48" r="5" fill="#FFF"/>
          <circle cx="15" cy="48" r="3.5" fill="#263238"/>
          <circle cx="16" cy="47" r="1.5" fill="#FFF"/>
          
          <!-- Manchas douradas -->
          <ellipse cx="50" cy="45" rx="15" ry="10" fill="url(#goldGrad${i})" opacity="0.7"/>
          <ellipse cx="65" cy="55" rx="12" ry="8" fill="url(#goldGrad${i})" opacity="0.6"/>
          
          <!-- Cauda -->
          <path d="M 95 50 Q 120 30, 150 40 Q 145 50, 150 60 Q 120 70, 95 50" fill="#B71C1C" opacity="0.9"/>
          <path d="M 95 50 Q 115 35, 135 45 Q 130 50, 135 55 Q 115 65, 95 50" fill="#C62828" opacity="0.7"/>
          
          <!-- Barbatanas dorsais -->
          <ellipse cx="60" cy="35" rx="15" ry="8" fill="#E53935" opacity="0.8"/>
          
          <!-- Barbatanas ventrais -->
          <ellipse cx="60" cy="65" rx="15" ry="8" fill="#E53935" opacity="0.8"/>
          
          <!-- Barbatanas peitorais -->
          <ellipse cx="40" cy="50" rx="10" ry="7" fill="#E53935" opacity="0.7"/>
        </svg>
      `
      
      // Posição inicial
      const startY = 150 + (i * 120)
      const startX = -150
      
      // Estilos
      fish.style.position = 'absolute'
      fish.style.width = '150px'
      fish.style.height = '75px'
      fish.style.left = `${startX}px`
      fish.style.top = `${startY}px`
      fish.style.opacity = '1'
      fish.style.visibility = 'visible'
      fish.style.zIndex = '6'
      
      container.appendChild(fish)
      
      // Animação GSAP simples
      const duration = 15 + Math.random() * 10
      const endX = (window.innerWidth || 1920) + 200 // Fallback para SSR
      const verticalAmplitude = 30 + Math.random() * 20
      
      // Configurar posição inicial
      gsap.set(fish, {
        x: startX,
        y: startY,
        rotation: 0,
        opacity: 0.9
      })
      
      // Timeline principal de natação
      const tl = gsap.timeline({ 
        repeat: -1,
        onRepeat: () => {
          // Resetar posição quando reiniciar
          gsap.set(fish, { x: startX, y: startY, rotation: 0 })
        }
      })
      
      // Criar movimento ondulante com múltiplos pontos
      const segments = 8
      for (let j = 0; j <= segments; j++) {
        const progress = j / segments
        const x = startX + (endX - startX) * progress
        const y = startY + Math.sin(progress * Math.PI * 2) * verticalAmplitude * 0.5
        const rotation = Math.sin(progress * Math.PI * 2) * 5
        
        tl.to(fish, {
          x: x,
          y: y,
          rotation: rotation,
          duration: duration / segments,
          ease: 'sine.inOut',
          overwrite: false // Permitir que outras animações funcionem
        })
      }
      
      // Animação vertical suave adicional (mais sutil para não conflitar)
      const verticalAnim = gsap.to(fish, {
        y: `+=${verticalAmplitude * 0.3}`,
        duration: 4 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        overwrite: 'auto' // Só sobrescrever se não houver conflito
      })
      
      fishes.push(fish)
      allAnimations.push(tl, verticalAnim)
    }

    return () => {
      // Limpar todas as animações
      allAnimations.forEach(anim => {
        if (anim && typeof anim.kill === 'function') {
          anim.kill()
        }
      })
      
      fishes.forEach(fish => {
        gsap.killTweensOf(fish)
      })
      
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [count])

  return (
    <div 
      ref={containerRef} 
      className="koi-container" 
      aria-hidden="true"
    ></div>
  )
}

export default KoiFish
