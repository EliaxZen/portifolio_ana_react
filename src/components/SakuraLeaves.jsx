import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './SakuraLeaves.css'

function SakuraLeaves({ count = 20 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.innerHTML = ''
    const leaves = []
    const allAnimations = []

    // Criar folhas de sakura super detalhadas
    for (let i = 0; i < Math.min(count, 30); i++) {
      const leaf = document.createElement('div')
      leaf.className = 'sakura-leaf'
      
      // Propriedades variadas para cada folha
      const size = 25 + Math.random() * 20
      const delay = Math.random() * 8
      let startX = Math.random() * (window.innerWidth || 1920)
      const horizontalDrift = (Math.random() - 0.5) * 300
      const fallDuration = 10 + Math.random() * 12
      const rotationSpeed = 0.5 + Math.random() * 1.5
      const initialRotation = Math.random() * 360
      let endX = startX + horizontalDrift
      
      // SVG super detalhado de sakura em vermelho/dourado
      leaf.innerHTML = `
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- Gradiente vermelho principal -->
            <radialGradient id="redGrad${i}" cx="50%" cy="30%">
              <stop offset="0%" style="stop-color:#FFD54F;stop-opacity:0.95" />
              <stop offset="30%" style="stop-color:#FFC107;stop-opacity:0.9" />
              <stop offset="60%" style="stop-color:#F9A825;stop-opacity:0.85" />
              <stop offset="100%" style="stop-color:#C62828;stop-opacity:0.8" />
            </radialGradient>
            
            <!-- Gradiente dourado para centro -->
            <radialGradient id="goldGrad${i}" cx="50%" cy="50%">
              <stop offset="0%" style="stop-color:#FFF59D;stop-opacity:1" />
              <stop offset="40%" style="stop-color:#FFD54F;stop-opacity:0.95" />
              <stop offset="70%" style="stop-color:#FFC107;stop-opacity:0.9" />
              <stop offset="100%" style="stop-color:#F9A825;stop-opacity:0.85" />
            </radialGradient>
            
            <!-- Gradiente vermelho para pétalas -->
            <linearGradient id="petalGrad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#E53935;stop-opacity:0.95" />
              <stop offset="30%" style="stop-color:#C62828;stop-opacity:0.9" />
              <stop offset="70%" style="stop-color:#B71C1C;stop-opacity:0.85" />
              <stop offset="100%" style="stop-color:#C62828;stop-opacity:0.9" />
            </linearGradient>
            
            <!-- Gradiente dourado para bordas -->
            <linearGradient id="edgeGrad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFD54F;stop-opacity:0.8" />
              <stop offset="50%" style="stop-color:#FFC107;stop-opacity:0.7" />
              <stop offset="100%" style="stop-color:#F9A825;stop-opacity:0.6" />
            </linearGradient>
            
            <!-- Filtro de brilho -->
            <filter id="glow${i}">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <!-- Filtro de sombra -->
            <filter id="shadow${i}">
              <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="#B71C1C" flood-opacity="0.3"/>
            </filter>
            
            <!-- Filtro de brilho forte -->
            <filter id="strongGlow${i}">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Grupo principal -->
          <g transform="translate(60, 60)">
            
            <!-- Pétala 1 - Superior -->
            <g data-petal="1">
              <ellipse cx="0" cy="-35" rx="14" ry="28" fill="url(#petalGrad${i})" filter="url(#glow${i})" opacity="0.95"/>
              <ellipse cx="0" cy="-35" rx="12" ry="26" fill="url(#redGrad${i})" opacity="0.8"/>
              <ellipse cx="2" cy="-38" rx="8" ry="18" fill="url(#edgeGrad${i})" opacity="0.6"/>
              <path d="M -2 -35 Q 0 -40, 2 -35" stroke="url(#edgeGrad${i})" stroke-width="0.5" fill="none" opacity="0.7"/>
            </g>
            
            <!-- Pétala 2 - Superior Direita -->
            <g data-petal="2" transform="rotate(72)">
              <ellipse cx="0" cy="-35" rx="14" ry="28" fill="url(#petalGrad${i})" filter="url(#glow${i})" opacity="0.95"/>
              <ellipse cx="0" cy="-35" rx="12" ry="26" fill="url(#redGrad${i})" opacity="0.8"/>
              <ellipse cx="2" cy="-38" rx="8" ry="18" fill="url(#edgeGrad${i})" opacity="0.6"/>
              <path d="M -2 -35 Q 0 -40, 2 -35" stroke="url(#edgeGrad${i})" stroke-width="0.5" fill="none" opacity="0.7"/>
            </g>
            
            <!-- Pétala 3 - Inferior Direita -->
            <g data-petal="3" transform="rotate(144)">
              <ellipse cx="0" cy="-35" rx="14" ry="28" fill="url(#petalGrad${i})" filter="url(#glow${i})" opacity="0.95"/>
              <ellipse cx="0" cy="-35" rx="12" ry="26" fill="url(#redGrad${i})" opacity="0.8"/>
              <ellipse cx="2" cy="-38" rx="8" ry="18" fill="url(#edgeGrad${i})" opacity="0.6"/>
              <path d="M -2 -35 Q 0 -40, 2 -35" stroke="url(#edgeGrad${i})" stroke-width="0.5" fill="none" opacity="0.7"/>
            </g>
            
            <!-- Pétala 4 - Inferior Esquerda -->
            <g data-petal="4" transform="rotate(216)">
              <ellipse cx="0" cy="-35" rx="14" ry="28" fill="url(#petalGrad${i})" filter="url(#glow${i})" opacity="0.95"/>
              <ellipse cx="0" cy="-35" rx="12" ry="26" fill="url(#redGrad${i})" opacity="0.8"/>
              <ellipse cx="2" cy="-38" rx="8" ry="18" fill="url(#edgeGrad${i})" opacity="0.6"/>
              <path d="M -2 -35 Q 0 -40, 2 -35" stroke="url(#edgeGrad${i})" stroke-width="0.5" fill="none" opacity="0.7"/>
            </g>
            
            <!-- Pétala 5 - Superior Esquerda -->
            <g data-petal="5" transform="rotate(288)">
              <ellipse cx="0" cy="-35" rx="14" ry="28" fill="url(#petalGrad${i})" filter="url(#glow${i})" opacity="0.95"/>
              <ellipse cx="0" cy="-35" rx="12" ry="26" fill="url(#redGrad${i})" opacity="0.8"/>
              <ellipse cx="2" cy="-38" rx="8" ry="18" fill="url(#edgeGrad${i})" opacity="0.6"/>
              <path d="M -2 -35 Q 0 -40, 2 -35" stroke="url(#edgeGrad${i})" stroke-width="0.5" fill="none" opacity="0.7"/>
            </g>
            
            <!-- Centro dourado detalhado -->
            <circle cx="0" cy="0" r="10" fill="url(#goldGrad${i})" filter="url(#strongGlow${i})" opacity="0.95"/>
            <circle cx="0" cy="0" r="8" fill="#FFD54F" opacity="0.9"/>
            <circle cx="0" cy="0" r="6" fill="#FFC107" opacity="0.85"/>
            <circle cx="0" cy="0" r="4" fill="#F9A825" opacity="0.9"/>
            
            <!-- Detalhes do centro -->
            <circle cx="-1" cy="-1" r="2" fill="#FFF59D" opacity="0.8"/>
            <circle cx="1" cy="1" r="1.5" fill="#FFD54F" opacity="0.7"/>
            
            <!-- Estames (partes internas) -->
            <line x1="0" y1="0" x2="0" y2="-8" stroke="#F9A825" stroke-width="1" opacity="0.6"/>
            <line x1="0" y1="0" x2="5" y2="-5" stroke="#F9A825" stroke-width="0.8" opacity="0.5"/>
            <line x1="0" y1="0" x2="-5" y2="-5" stroke="#F9A825" stroke-width="0.8" opacity="0.5"/>
            <line x1="0" y1="0" x2="5" y2="5" stroke="#F9A825" stroke-width="0.8" opacity="0.5"/>
            <line x1="0" y1="0" x2="-5" y2="5" stroke="#F9A825" stroke-width="0.8" opacity="0.5"/>
            
            <!-- Brilhos nas pétalas -->
            <ellipse cx="0" cy="-40" rx="6" ry="12" fill="#FFF59D" opacity="0.3"/>
            <ellipse cx="25" cy="-20" rx="5" ry="10" fill="#FFD54F" opacity="0.25"/>
            <ellipse cx="20" cy="20" rx="5" ry="10" fill="#FFC107" opacity="0.25"/>
            <ellipse cx="-25" cy="20" rx="5" ry="10" fill="#FFD54F" opacity="0.25"/>
            <ellipse cx="-25" cy="-20" rx="5" ry="10" fill="#FFC107" opacity="0.25"/>
          </g>
        </svg>
      `
      
      // Estilos
      leaf.style.position = 'absolute'
      leaf.style.width = `${size}px`
      leaf.style.height = `${size}px`
      leaf.style.left = `${startX}px`
      leaf.style.top = '-100px'
      leaf.style.opacity = '0.9'
      leaf.style.zIndex = '4'
      leaf.style.pointerEvents = 'none'
      
      container.appendChild(leaf)
      
      // Escala fixa (sem mudanças)
      const fixedScale = 0.8 + Math.random() * 0.4
      const screenHeight = window.innerHeight || 1080
      
      // Configurar posição inicial usando GSAP set
      gsap.set(leaf, {
        x: startX,
        y: -100,
        rotation: initialRotation,
        opacity: 0.9,
        scale: fixedScale,
        force3D: true,
        transformOrigin: 'center center'
      })
      
      // Criar timeline GSAP avançada com física realista
      const fallAnim = gsap.timeline({
        repeat: -1,
        delay: delay,
        onRepeat: () => {
          // Resetar posição quando reiniciar
          startX = Math.random() * (window.innerWidth || 1920)
          endX = startX + (Math.random() - 0.5) * 400
          gsap.set(leaf, {
            x: startX,
            y: -100,
            rotation: Math.random() * 360,
            opacity: 0.9,
            scale: fixedScale
          })
        }
      })
      
      // Usar GSAP avançado com múltiplas animações sincronizadas
      // Animação principal de queda vertical com física realista
      fallAnim.to(leaf, {
        y: screenHeight + 150,
        duration: fallDuration,
        ease: 'power1.in', // Aceleração natural da gravidade
        overwrite: false // Permitir outras animações
      })
      
      // Movimento horizontal com ondas usando GSAP timeline
      const horizontalAnim = gsap.timeline({ repeat: -1, delay: delay })
      horizontalAnim.to(leaf, {
        x: endX,
        duration: fallDuration,
        ease: 'sine.inOut', // Movimento suave
        overwrite: false
      })
      
      // Adicionar movimento ondulante horizontal adicional
      const waveAnim = gsap.to(leaf, {
        x: `+=${40}`,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        overwrite: 'auto'
      })
      
      // Rotação contínua e natural usando GSAP
      const rotationAnim = gsap.to(leaf, {
        rotation: `+=${360 * rotationSpeed}`,
        duration: fallDuration,
        ease: 'none', // Rotação constante
        repeat: -1,
        overwrite: false
      })
      
      // Rotação adicional com wobble (oscilação natural) usando GSAP
      const wobbleAnim = gsap.to(leaf, {
        rotation: `+=${15 + Math.random() * 10}`,
        duration: 2.5 + Math.random() * 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        overwrite: false
      })
      
      // Opacidade fade out suave no final usando GSAP timeline
      const fadeOutAnim = gsap.timeline({ repeat: -1, delay: delay })
      fadeOutAnim
        .to(leaf, {
          opacity: 0.9,
          duration: fallDuration * 0.88, // Mantém opacidade por 88% do tempo
          ease: 'none'
        })
        .to(leaf, {
          opacity: 0,
          duration: fallDuration * 0.12, // Fade out nos últimos 12%
          ease: 'power1.in'
        })
      
      // Sincronizar todas as animações GSAP
      leaves.push(leaf)
      allAnimations.push(fallAnim, horizontalAnim, waveAnim, rotationAnim, wobbleAnim, fadeOutAnim)
    }

    return () => {
      // Limpar todas as animações
      allAnimations.forEach(anim => {
        if (anim && typeof anim.kill === 'function') {
          anim.kill()
        }
      })
      
      leaves.forEach(leaf => {
        gsap.killTweensOf(leaf)
      })
      
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [count])

  return (
    <div 
      ref={containerRef} 
      className="sakura-container" 
      aria-hidden="true"
    ></div>
  )
}

export default SakuraLeaves
