import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './KoiFish.css'

function KoiFish({ count = 3 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Limpar carpas existentes
    container.innerHTML = ''

    const fishes = []
    const maxCount = Math.min(count, 5)
    const observers = []
    const scrollHandlers = []

    // Criar múltiplas carpas
    for (let i = 0; i < maxCount; i++) {
      const fish = document.createElement('div')
      fish.className = 'koi-fish'
      fish.setAttribute('data-fish-id', i)
      
      // Criar SVG da carpa
      const svgContent = createKoiSVG(i)
      fish.innerHTML = svgContent
      
      // Propriedades iniciais
      const startY = Math.max(100, Math.min(window.innerHeight - 250, Math.random() * (window.innerHeight - 200)))
      const size = 0.7 + Math.random() * 0.5
      const direction = Math.random() > 0.5 ? 1 : -1
      const speed = 0.6 + Math.random() * 0.4
      
      // Configurar posição inicial - começar visível na tela
      const startX = -200
      
      fish.setAttribute('aria-hidden', 'true')
      
      // Forçar estilos iniciais antes de adicionar ao DOM
      fish.style.position = 'absolute'
      fish.style.width = '180px'
      fish.style.height = '90px'
      fish.style.left = `${startX}px`
      fish.style.top = `${startY}px`
      fish.style.opacity = '0.9'
      fish.style.visibility = 'visible'
      fish.style.display = 'block'
      fish.style.transform = `scale(${size}) scaleX(${direction})`
      
      container.appendChild(fish)
      
      // Configurar GSAP após adicionar ao DOM
      gsap.set(fish, {
        x: startX,
        y: startY,
        scale: size,
        scaleX: direction,
        opacity: 0.95,
        visibility: 'visible',
        display: 'block',
        zIndex: 51
      })
      
      // Obter elementos SVG para animação
      const svg = fish.querySelector('svg')
      const tail = svg?.querySelector('[data-part="tail"]')
      const dorsalFin = svg?.querySelector('[data-part="dorsal-fin"]')
      const ventralFin = svg?.querySelector('[data-part="ventral-fin"]')
      const pectoralFin = svg?.querySelector('[data-part="pectoral-fin"]')
      const body = svg?.querySelector('[data-part="body"]')
      const scales = svg?.querySelectorAll('[data-part="scale"]')
      
      // Criar animações GSAP
      const animations = createKoiAnimations(
        fish,
        tail,
        dorsalFin,
        ventralFin,
        pectoralFin,
        body,
        scales,
        startY,
        size,
        direction,
        speed
      )
      
      // Parallax no scroll
      const initialY = startY
      const handleScroll = () => {
        const scrollY = window.scrollY
        const parallaxOffset = scrollY * 0.06 * (Math.random() * 0.3 + 0.7)
        
        gsap.to(fish, {
          y: initialY + parallaxOffset,
          duration: 0.4,
          ease: 'power1.out',
          overwrite: true
        })
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      scrollHandlers.push({ handleScroll, fish })
      
      // Observer para resetar quando sair da tela
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting && entry.boundingClientRect.left > window.innerWidth + 100) {
            resetFishPosition(fish, startY)
          }
        })
      }, { threshold: 0, rootMargin: '100px' })
      
      observer.observe(fish)
      observers.push({ observer, fish })
      
      fishes.push({ fish, animations, initialY: startY })
    }

    // Função para resetar posição da carpa
    const resetFishPosition = (fishElement, startYPos) => {
      gsap.killTweensOf(fishElement)
      gsap.set(fishElement, {
        x: -200,
        y: startYPos,
        rotation: 0,
        clearProps: 'transform'
      })
      
      // Reiniciar animações
      const fishData = fishes.find(f => f.fish === fishElement)
      if (fishData && fishData.animations) {
        fishData.animations.forEach(anim => {
          if (anim && typeof anim.restart === 'function') {
            anim.restart()
          }
        })
      }
    }

    // Cleanup
    return () => {
      // Matar todas as animações
      fishes.forEach(({ fish, animations }) => {
        gsap.killTweensOf(fish)
        if (animations) {
          animations.forEach(anim => {
            if (anim && typeof anim.kill === 'function') {
              anim.kill()
            }
          })
        }
      })
      
      // Remover event listeners
      scrollHandlers.forEach(({ handleScroll }) => {
        window.removeEventListener('scroll', handleScroll)
      })
      
      // Desconectar observers
      observers.forEach(({ observer }) => {
        observer.disconnect()
      })
      
      // Limpar container
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
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 50,
        pointerEvents: 'none',
        visibility: 'visible',
        display: 'block'
      }}
    ></div>
  )
}

// Função para criar SVG da carpa
function createKoiSVG(id) {
  return `
    <svg viewBox="0 0 280 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bodyGrad${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#B71C1C;stop-opacity:1" />
          <stop offset="30%" style="stop-color:#C62828;stop-opacity:1" />
          <stop offset="60%" style="stop-color:#E53935;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#B71C1C;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="goldGrad${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD54F;stop-opacity:0.95" />
          <stop offset="30%" style="stop-color:#FFC107;stop-opacity:0.9" />
          <stop offset="70%" style="stop-color:#F9A825;stop-opacity:0.85" />
          <stop offset="100%" style="stop-color:#FFB300;stop-opacity:0.9" />
        </linearGradient>
        <radialGradient id="scaleGrad${id}" cx="50%" cy="50%">
          <stop offset="0%" style="stop-color:#FFD54F;stop-opacity:0.9" />
          <stop offset="50%" style="stop-color:#FFC107;stop-opacity:0.7" />
          <stop offset="100%" style="stop-color:#F9A825;stop-opacity:0.5" />
        </radialGradient>
        <radialGradient id="scaleShadow${id}" cx="30%" cy="30%">
          <stop offset="0%" style="stop-color:#000000;stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:#000000;stop-opacity:0" />
        </radialGradient>
        <filter id="glow${id}">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="shadow${id}">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
      </defs>
      
      <!-- Sombra da carpa -->
      <ellipse cx="140" cy="95" rx="70" ry="8" fill="#000" opacity="0.15" filter="url(#shadow${id})"/>
      
      <!-- Cabeça -->
      <ellipse cx="35" cy="70" rx="30" ry="24" fill="url(#bodyGrad${id})" filter="url(#glow${id})"/>
      <ellipse cx="32" cy="68" rx="24" ry="20" fill="#E53935" opacity="0.8"/>
      
      <!-- Olho -->
      <circle cx="25" cy="65" r="7" fill="#FFF" opacity="0.95"/>
      <circle cx="25" cy="65" r="5.5" fill="#263238"/>
      <circle cx="26.5" cy="63.5" r="2.5" fill="#FFF" opacity="0.9"/>
      <circle cx="25" cy="65" r="2" fill="#000"/>
      <circle cx="26" cy="64" r="0.8" fill="#FFF" opacity="0.8"/>
      
      <!-- Corpo -->
      <g data-part="body" transform-origin="140 70">
        <ellipse cx="140" cy="70" rx="70" ry="35" fill="url(#bodyGrad${id})" opacity="0.98" filter="url(#glow${id})"/>
        <ellipse cx="140" cy="68" rx="65" ry="32" fill="#E53935" opacity="0.7"/>
        <ellipse cx="135" cy="65" rx="60" ry="30" fill="#EF5350" opacity="0.4"/>
      </g>
      
      <!-- Escamas -->
      <g opacity="0.9" filter="url(#glow${id})">
        <ellipse cx="110" cy="52" rx="11" ry="8" fill="url(#scaleGrad${id})" stroke="#FFB300" stroke-width="0.8" opacity="0.9" data-part="scale"/>
        <ellipse cx="130" cy="49" rx="11" ry="8" fill="url(#scaleGrad${id})" stroke="#FFB300" stroke-width="0.8" opacity="0.9" data-part="scale"/>
        <ellipse cx="150" cy="52" rx="11" ry="8" fill="url(#scaleGrad${id})" stroke="#FFB300" stroke-width="0.8" opacity="0.9" data-part="scale"/>
        <ellipse cx="170" cy="55" rx="11" ry="8" fill="url(#scaleGrad${id})" stroke="#FFB300" stroke-width="0.8" opacity="0.9" data-part="scale"/>
        <ellipse cx="120" cy="65" rx="11" ry="8" fill="url(#scaleGrad${id})" stroke="#FFB300" stroke-width="0.8" opacity="0.85" data-part="scale"/>
        <ellipse cx="140" cy="62" rx="11" ry="8" fill="url(#scaleGrad${id})" stroke="#FFB300" stroke-width="0.8" opacity="0.85" data-part="scale"/>
        <ellipse cx="160" cy="65" rx="11" ry="8" fill="url(#scaleGrad${id})" stroke="#FFB300" stroke-width="0.8" opacity="0.85" data-part="scale"/>
        <ellipse cx="125" cy="75" rx="11" ry="8" fill="url(#scaleGrad${id})" stroke="#FFB300" stroke-width="0.8" opacity="0.8" data-part="scale"/>
        <ellipse cx="145" cy="73" rx="11" ry="8" fill="url(#scaleGrad${id})" stroke="#FFB300" stroke-width="0.8" opacity="0.8" data-part="scale"/>
        <ellipse cx="165" cy="76" rx="11" ry="8" fill="url(#scaleGrad${id})" stroke="#FFB300" stroke-width="0.8" opacity="0.8" data-part="scale"/>
        <ellipse cx="135" cy="82" rx="11" ry="8" fill="url(#scaleGrad${id})" stroke="#FFB300" stroke-width="0.8" opacity="0.75" data-part="scale"/>
        <ellipse cx="155" cy="80" rx="11" ry="8" fill="url(#scaleGrad${id})" stroke="#FFB300" stroke-width="0.8" opacity="0.75" data-part="scale"/>
      </g>
      
      <!-- Manchas douradas -->
      <ellipse cx="140" cy="58" rx="18" ry="12" fill="url(#goldGrad${id})" opacity="0.7" filter="url(#glow${id})"/>
      <ellipse cx="160" cy="72" rx="15" ry="10" fill="url(#goldGrad${id})" opacity="0.6" filter="url(#glow${id})"/>
      
      <!-- Cauda -->
      <g data-part="tail" transform-origin="190 70">
        <path d="M 190 70 Q 220 40, 260 55 Q 255 70, 260 85 Q 220 100, 190 70" fill="#B71C1C" opacity="0.98" filter="url(#shadow${id})"/>
        <path d="M 190 70 Q 215 45, 240 60 Q 235 70, 240 80 Q 215 95, 190 70" fill="#C62828" opacity="0.8"/>
        <path d="M 195 68 Q 210 55, 225 60" stroke="#FFD54F" stroke-width="2" fill="none" opacity="0.7" stroke-linecap="round"/>
        <path d="M 195 72 Q 210 85, 225 80" stroke="#FFD54F" stroke-width="2" fill="none" opacity="0.7" stroke-linecap="round"/>
      </g>
      
      <!-- Barbatanas dorsais -->
      <g data-part="dorsal-fin" transform-origin="110 50">
        <ellipse cx="110" cy="48" rx="20" ry="12" fill="#E53935" opacity="0.9" filter="url(#glow${id})"/>
        <ellipse cx="108" cy="46" rx="14" ry="8" fill="#EF5350" opacity="0.7"/>
        <path d="M 92 42 Q 98 38, 104 42" stroke="#FFD54F" stroke-width="1.5" fill="none" opacity="0.6" stroke-linecap="round"/>
      </g>
      
      <!-- Barbatanas ventrais -->
      <g data-part="ventral-fin" transform-origin="110 92">
        <ellipse cx="110" cy="92" rx="20" ry="12" fill="#E53935" opacity="0.9" filter="url(#glow${id})"/>
        <ellipse cx="108" cy="94" rx="14" ry="8" fill="#EF5350" opacity="0.7"/>
        <path d="M 92 98 Q 98 102, 104 98" stroke="#FFD54F" stroke-width="1.5" fill="none" opacity="0.6" stroke-linecap="round"/>
      </g>
      
      <!-- Barbatanas peitorais -->
      <g data-part="pectoral-fin" transform-origin="90 70">
        <ellipse cx="90" cy="70" rx="14" ry="10" fill="#E53935" opacity="0.8"/>
        <ellipse cx="88" cy="68" rx="10" ry="7" fill="#EF5350" opacity="0.6"/>
        <path d="M 78 65 Q 82 60, 86 65" stroke="#F9A825" stroke-width="1.2" fill="none" opacity="0.5"/>
      </g>
      
      <!-- Bigodes -->
      <path d="M 10 65 Q 8 63, 10 61" stroke="#F9A825" stroke-width="1.5" fill="none" opacity="0.6" stroke-linecap="round"/>
      <path d="M 10 75 Q 8 77, 10 79" stroke="#F9A825" stroke-width="1.5" fill="none" opacity="0.6" stroke-linecap="round"/>
      
      <!-- Brilho -->
      <ellipse cx="130" cy="60" rx="25" ry="15" fill="#FFF" opacity="0.15"/>
    </svg>
  `
}

// Função para criar todas as animações GSAP
function createKoiAnimations(fish, tail, dorsalFin, ventralFin, pectoralFin, body, scales, startY, size, direction, speed) {
  const animations = []
  const swimDuration = (20 + Math.random() * 15) / speed
  const verticalAmplitude = 25 + Math.random() * 35
  const rotationAmplitude = 1.5 + Math.random() * 2.5
  
  // Animação principal de natação horizontal
  const mainSwim = gsap.timeline({ 
    repeat: -1,
    delay: Math.random() * 1, // Delay menor
    ease: 'none',
    immediateRender: true
  })
  
  // Garantir que comece visível
  gsap.set(fish, { 
    x: -250, 
    y: startY, 
    rotation: 0,
    opacity: 0.95,
    visibility: 'visible',
    display: 'block',
    zIndex: 51
  })
  
  // Criar movimento ondulante
  const segments = 6
  for (let i = 0; i <= segments; i++) {
    const progress = i / segments
    const x = -250 + (window.innerWidth + 500) * progress
    const y = startY - verticalAmplitude * Math.sin(progress * Math.PI * 2) * 0.5
    const rot = direction * rotationAmplitude * Math.sin(progress * Math.PI * 2) * 0.5
    
    mainSwim.to(fish, {
      x: x,
      y: y,
      rotation: rot,
      duration: swimDuration / segments,
      ease: i === 0 ? 'power2.out' : i === segments ? 'power2.in' : 'sine.inOut',
      onComplete: i === segments ? () => {
        gsap.set(fish, { x: -250, y: startY, rotation: 0 })
      } : undefined
    })
  }
  
  // Iniciar imediatamente
  mainSwim.play()
  
  animations.push(mainSwim)
  
  // Animação vertical contínua (ondulação)
  const verticalAnim = gsap.to(fish, {
    y: `+=${verticalAmplitude}`,
    duration: 2.5 + Math.random() * 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: Math.random() * 1
  })
  animations.push(verticalAnim)
  
  // Animação de rotação sutil
  const rotationAnim = gsap.to(fish, {
    rotation: `+=${direction * rotationAmplitude}`,
    duration: 2 + Math.random() * 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: Math.random() * 1
  })
  animations.push(rotationAnim)
  
  // Animação de escala (profundidade)
  const scaleAnim = gsap.to(fish, {
    scale: size * (1 + Math.random() * 0.04),
    duration: 3 + Math.random() * 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
  animations.push(scaleAnim)
  
  // Animação da cauda
  if (tail) {
    const tailAnim = gsap.timeline({ repeat: -1 })
    tailAnim
      .to(tail, {
        rotation: direction * (15 + Math.random() * 10),
        transformOrigin: '190px 70px',
        duration: 0.2 + Math.random() * 0.1,
        ease: 'power2.out'
      })
      .to(tail, {
        rotation: direction * (-8 - Math.random() * 5),
        duration: 0.2 + Math.random() * 0.1,
        ease: 'power2.in'
      })
      .to(tail, {
        rotation: direction * (15 + Math.random() * 10),
        duration: 0.2 + Math.random() * 0.1,
        ease: 'power2.out'
      })
      .to(tail, {
        rotation: 0,
        duration: 0.2 + Math.random() * 0.1,
        ease: 'power2.in'
      })
    animations.push(tailAnim)
  }
  
  // Animação das barbatanas dorsais
  if (dorsalFin) {
    const dorsalAnim = gsap.to(dorsalFin, {
      rotation: direction * (6 + Math.random() * 5),
      transformOrigin: '110px 50px',
      duration: 0.5 + Math.random() * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 0.5
    })
    animations.push(dorsalAnim)
  }
  
  // Animação das barbatanas ventrais
  if (ventralFin) {
    const ventralAnim = gsap.to(ventralFin, {
      rotation: direction * (-6 - Math.random() * 5),
      transformOrigin: '110px 92px',
      duration: 0.5 + Math.random() * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 0.5
    })
    animations.push(ventralAnim)
  }
  
  // Animação das barbatanas peitorais
  if (pectoralFin) {
    const pectoralAnim = gsap.timeline({ repeat: -1 })
    pectoralAnim
      .to(pectoralFin, {
        rotation: direction * (20 + Math.random() * 15),
        transformOrigin: '90px 70px',
        duration: 0.3 + Math.random() * 0.1,
        ease: 'power1.out'
      })
      .to(pectoralFin, {
        rotation: direction * (-12 - Math.random() * 8),
        duration: 0.3 + Math.random() * 0.1,
        ease: 'power1.in'
      })
    animations.push(pectoralAnim)
  }
  
  // Animação do corpo
  if (body) {
    const bodyAnim = gsap.to(body, {
      scaleY: 1.02 + (Math.random() * 0.03),
      scaleX: 1 + (Math.random() * 0.015),
      duration: 1.2 + Math.random() * 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
    animations.push(bodyAnim)
  }
  
  // Animação das escamas
  if (scales && scales.length > 0) {
    scales.forEach((scale, index) => {
      const scaleAnim = gsap.to(scale, {
        opacity: 0.8 + Math.random() * 0.2,
        scale: 1.03 + Math.random() * 0.04,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: (index * 0.1) + Math.random() * 0.5
      })
      animations.push(scaleAnim)
    })
  }
  
  // Animação de opacidade
  const opacityAnim = gsap.to(fish, {
    opacity: 0.88 + Math.random() * 0.12,
    duration: 3 + Math.random() * 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: Math.random() * 1.5
  })
  animations.push(opacityAnim)
  
  return animations
}

export default KoiFish
