import { useEffect, useRef, memo, useMemo } from 'react'
import { gsap } from 'gsap'
import { isLowEndDevice } from '@/utils/performance'
import './SakuraLeaves.css'

function SakuraLeaves({ count = 20 }) {
  const isLowEnd = useMemo(() => isLowEndDevice(), [])
  // Reduzir contagem em dispositivos de baixa performance
  const leafCount = useMemo(() => isLowEnd ? Math.min(count, 10) : Math.min(count, 20), [count, isLowEnd])
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.innerHTML = ''
    const leaves = []
    const allAnimations = []

    // Criar folhas de sakura super detalhadas
    for (let i = 0; i < leafCount; i++) {
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
      
      // SVG super detalhado e realista de sakura em vermelho/dourado
      leaf.innerHTML = `
        <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- Gradiente vermelho principal com mais camadas -->
            <radialGradient id="redGrad${i}" cx="50%" cy="30%">
              <stop offset="0%" style="stop-color:#FFF59D;stop-opacity:1" />
              <stop offset="20%" style="stop-color:#FFD54F;stop-opacity:0.98" />
              <stop offset="40%" style="stop-color:#FFC107;stop-opacity:0.95" />
              <stop offset="60%" style="stop-color:#F9A825;stop-opacity:0.9" />
              <stop offset="80%" style="stop-color:#E53935;stop-opacity:0.85" />
              <stop offset="100%" style="stop-color:#C62828;stop-opacity:0.8" />
            </radialGradient>
            
            <!-- Gradiente dourado para centro (mais rico) -->
            <radialGradient id="goldGrad${i}" cx="50%" cy="50%">
              <stop offset="0%" style="stop-color:#FFFDE7;stop-opacity:1" />
              <stop offset="25%" style="stop-color:#FFF59D;stop-opacity:0.98" />
              <stop offset="50%" style="stop-color:#FFD54F;stop-opacity:0.95" />
              <stop offset="75%" style="stop-color:#FFC107;stop-opacity:0.9" />
              <stop offset="100%" style="stop-color:#F9A825;stop-opacity:0.85" />
            </radialGradient>
            
            <!-- Gradiente vermelho para pétalas (mais detalhado) -->
            <linearGradient id="petalGrad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#EF5350;stop-opacity:0.98" />
              <stop offset="25%" style="stop-color:#E53935;stop-opacity:0.95" />
              <stop offset="50%" style="stop-color:#C62828;stop-opacity:0.92" />
              <stop offset="75%" style="stop-color:#B71C1C;stop-opacity:0.88" />
              <stop offset="100%" style="stop-color:#C62828;stop-opacity:0.9" />
            </linearGradient>
            
            <!-- Gradiente dourado para bordas (mais brilhante) -->
            <linearGradient id="edgeGrad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFF59D;stop-opacity:0.9" />
              <stop offset="30%" style="stop-color:#FFD54F;stop-opacity:0.85" />
              <stop offset="60%" style="stop-color:#FFC107;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#F9A825;stop-opacity:0.75" />
            </linearGradient>
            
            <!-- Gradiente para textura das pétalas -->
            <radialGradient id="textureGrad${i}" cx="50%" cy="50%">
              <stop offset="0%" style="stop-color:#FFD54F;stop-opacity:0.4" />
              <stop offset="50%" style="stop-color:#FFC107;stop-opacity:0.2" />
              <stop offset="100%" style="stop-color:#F9A825;stop-opacity:0" />
            </radialGradient>
            
            <!-- Filtro de brilho melhorado -->
            <filter id="glow${i}">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <!-- Filtro de sombra melhorado -->
            <filter id="shadow${i}">
              <feDropShadow dx="1.5" dy="1.5" stdDeviation="3" flood-color="#B71C1C" flood-opacity="0.4"/>
            </filter>
            
            <!-- Filtro de brilho forte -->
            <filter id="strongGlow${i}">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <!-- Filtro de brilho pulsante -->
            <filter id="pulseGlow${i}">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Grupo principal -->
          <g transform="translate(70, 70)">
            
            <!-- Pétala 1 - Superior (mais detalhada) -->
            <g data-petal="1" data-petal-group="petals">
              <!-- Camada base -->
              <ellipse cx="0" cy="-38" rx="16" ry="30" fill="url(#petalGrad${i})" filter="url(#glow${i})" opacity="0.96"/>
              <!-- Camada intermediária -->
              <ellipse cx="0" cy="-38" rx="14" ry="28" fill="url(#redGrad${i})" opacity="0.85"/>
              <!-- Camada superior com brilho -->
              <ellipse cx="2" cy="-40" rx="10" ry="20" fill="url(#edgeGrad${i})" opacity="0.7"/>
              <!-- Textura -->
              <ellipse cx="1" cy="-42" rx="6" ry="12" fill="url(#textureGrad${i})" opacity="0.5"/>
              <!-- Linha de destaque -->
              <path d="M -3 -38 Q 0 -43, 3 -38" stroke="url(#edgeGrad${i})" stroke-width="0.8" fill="none" opacity="0.8" data-petal-line="1"/>
              <!-- Detalhes adicionais -->
              <path d="M -2 -35 Q 0 -40, 2 -35" stroke="#FFD54F" stroke-width="0.4" fill="none" opacity="0.6" data-petal-detail="1"/>
            </g>
            
            <!-- Pétala 2 - Superior Direita -->
            <g data-petal="2" data-petal-group="petals" transform="rotate(72)">
              <ellipse cx="0" cy="-38" rx="16" ry="30" fill="url(#petalGrad${i})" filter="url(#glow${i})" opacity="0.96"/>
              <ellipse cx="0" cy="-38" rx="14" ry="28" fill="url(#redGrad${i})" opacity="0.85"/>
              <ellipse cx="2" cy="-40" rx="10" ry="20" fill="url(#edgeGrad${i})" opacity="0.7"/>
              <ellipse cx="1" cy="-42" rx="6" ry="12" fill="url(#textureGrad${i})" opacity="0.5"/>
              <path d="M -3 -38 Q 0 -43, 3 -38" stroke="url(#edgeGrad${i})" stroke-width="0.8" fill="none" opacity="0.8" data-petal-line="2"/>
              <path d="M -2 -35 Q 0 -40, 2 -35" stroke="#FFD54F" stroke-width="0.4" fill="none" opacity="0.6" data-petal-detail="2"/>
            </g>
            
            <!-- Pétala 3 - Inferior Direita -->
            <g data-petal="3" data-petal-group="petals" transform="rotate(144)">
              <ellipse cx="0" cy="-38" rx="16" ry="30" fill="url(#petalGrad${i})" filter="url(#glow${i})" opacity="0.96"/>
              <ellipse cx="0" cy="-38" rx="14" ry="28" fill="url(#redGrad${i})" opacity="0.85"/>
              <ellipse cx="2" cy="-40" rx="10" ry="20" fill="url(#edgeGrad${i})" opacity="0.7"/>
              <ellipse cx="1" cy="-42" rx="6" ry="12" fill="url(#textureGrad${i})" opacity="0.5"/>
              <path d="M -3 -38 Q 0 -43, 3 -38" stroke="url(#edgeGrad${i})" stroke-width="0.8" fill="none" opacity="0.8" data-petal-line="3"/>
              <path d="M -2 -35 Q 0 -40, 2 -35" stroke="#FFD54F" stroke-width="0.4" fill="none" opacity="0.6" data-petal-detail="3"/>
            </g>
            
            <!-- Pétala 4 - Inferior Esquerda -->
            <g data-petal="4" data-petal-group="petals" transform="rotate(216)">
              <ellipse cx="0" cy="-38" rx="16" ry="30" fill="url(#petalGrad${i})" filter="url(#glow${i})" opacity="0.96"/>
              <ellipse cx="0" cy="-38" rx="14" ry="28" fill="url(#redGrad${i})" opacity="0.85"/>
              <ellipse cx="2" cy="-40" rx="10" ry="20" fill="url(#edgeGrad${i})" opacity="0.7"/>
              <ellipse cx="1" cy="-42" rx="6" ry="12" fill="url(#textureGrad${i})" opacity="0.5"/>
              <path d="M -3 -38 Q 0 -43, 3 -38" stroke="url(#edgeGrad${i})" stroke-width="0.8" fill="none" opacity="0.8" data-petal-line="4"/>
              <path d="M -2 -35 Q 0 -40, 2 -35" stroke="#FFD54F" stroke-width="0.4" fill="none" opacity="0.6" data-petal-detail="4"/>
            </g>
            
            <!-- Pétala 5 - Superior Esquerda -->
            <g data-petal="5" data-petal-group="petals" transform="rotate(288)">
              <ellipse cx="0" cy="-38" rx="16" ry="30" fill="url(#petalGrad${i})" filter="url(#glow${i})" opacity="0.96"/>
              <ellipse cx="0" cy="-38" rx="14" ry="28" fill="url(#redGrad${i})" opacity="0.85"/>
              <ellipse cx="2" cy="-40" rx="10" ry="20" fill="url(#edgeGrad${i})" opacity="0.7"/>
              <ellipse cx="1" cy="-42" rx="6" ry="12" fill="url(#textureGrad${i})" opacity="0.5"/>
              <path d="M -3 -38 Q 0 -43, 3 -38" stroke="url(#edgeGrad${i})" stroke-width="0.8" fill="none" opacity="0.8" data-petal-line="5"/>
              <path d="M -2 -35 Q 0 -40, 2 -35" stroke="#FFD54F" stroke-width="0.4" fill="none" opacity="0.6" data-petal-detail="5"/>
            </g>
            
            <!-- Centro dourado super detalhado -->
            <g data-center="center">
              <circle cx="0" cy="0" r="12" fill="url(#goldGrad${i})" filter="url(#strongGlow${i})" opacity="0.98" data-center-base="base"/>
              <circle cx="0" cy="0" r="10" fill="#FFD54F" opacity="0.95" data-center-layer="layer1"/>
              <circle cx="0" cy="0" r="8" fill="#FFC107" opacity="0.9" data-center-layer="layer2"/>
              <circle cx="0" cy="0" r="6" fill="#F9A825" opacity="0.92" data-center-layer="layer3"/>
              <circle cx="0" cy="0" r="4" fill="#FFB300" opacity="0.95" data-center-core="core"/>
              
              <!-- Detalhes do centro com brilho -->
              <circle cx="-1.5" cy="-1.5" r="2.5" fill="#FFF59D" opacity="0.85" data-center-shine="shine1"/>
              <circle cx="1.5" cy="1.5" r="2" fill="#FFD54F" opacity="0.8" data-center-shine="shine2"/>
              <circle cx="0" cy="0" r="1.5" fill="#FFFDE7" opacity="0.9" data-center-highlight="highlight"/>
            </g>
            
            <!-- Estames detalhados (partes internas) -->
            <g data-stamens="stamens">
              <line x1="0" y1="0" x2="0" y2="-10" stroke="#F9A825" stroke-width="1.2" opacity="0.7" data-stamen="1"/>
              <line x1="0" y1="0" x2="6" y2="-6" stroke="#F9A825" stroke-width="1" opacity="0.6" data-stamen="2"/>
              <line x1="0" y1="0" x2="-6" y2="-6" stroke="#F9A825" stroke-width="1" opacity="0.6" data-stamen="3"/>
              <line x1="0" y1="0" x2="6" y2="6" stroke="#F9A825" stroke-width="1" opacity="0.6" data-stamen="4"/>
              <line x1="0" y1="0" x2="-6" y2="6" stroke="#F9A825" stroke-width="1" opacity="0.6" data-stamen="5"/>
              <!-- Pontos nas pontas dos estames -->
              <circle cx="0" cy="-10" r="1.5" fill="#F9A825" opacity="0.8" data-stamen-dot="1"/>
              <circle cx="6" cy="-6" r="1.2" fill="#F9A825" opacity="0.7" data-stamen-dot="2"/>
              <circle cx="-6" cy="-6" r="1.2" fill="#F9A825" opacity="0.7" data-stamen-dot="3"/>
              <circle cx="6" cy="6" r="1.2" fill="#F9A825" opacity="0.7" data-stamen-dot="4"/>
              <circle cx="-6" cy="6" r="1.2" fill="#F9A825" opacity="0.7" data-stamen-dot="5"/>
            </g>
            
            <!-- Brilhos animados nas pétalas -->
            <ellipse cx="0" cy="-42" rx="7" ry="14" fill="#FFF59D" opacity="0.4" data-shine="shine1"/>
            <ellipse cx="28" cy="-22" rx="6" ry="12" fill="#FFD54F" opacity="0.35" data-shine="shine2"/>
            <ellipse cx="22" cy="22" rx="6" ry="12" fill="#FFC107" opacity="0.35" data-shine="shine3"/>
            <ellipse cx="-28" cy="22" rx="6" ry="12" fill="#FFD54F" opacity="0.35" data-shine="shine4"/>
            <ellipse cx="-28" cy="-22" rx="6" ry="12" fill="#FFC107" opacity="0.35" data-shine="shine5"/>
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
        force3D: !isLowEnd, // Desabilitar 3D em dispositivos de baixa performance
        willChange: isLowEnd ? 'auto' : 'transform, opacity',
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
        overwrite: false, // Permitir outras animações
        force3D: !isLowEnd
      })
      
      // Movimento horizontal com ondas usando GSAP timeline
      const horizontalAnim = gsap.timeline({ repeat: -1, delay: delay })
      horizontalAnim.to(leaf, {
        x: endX,
        duration: fallDuration,
        ease: 'sine.inOut', // Movimento suave
        overwrite: false,
        force3D: !isLowEnd
      })
      
      // Adicionar movimento ondulante horizontal adicional (apenas se não for low-end)
      let waveAnim = null
      if (!isLowEnd) {
        waveAnim = gsap.to(leaf, {
          x: `+=${40}`,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          overwrite: 'auto',
          force3D: true
        })
      }
      
      // Rotação contínua e natural usando GSAP
      const rotationAnim = gsap.to(leaf, {
        rotation: `+=${360 * rotationSpeed}`,
        duration: fallDuration,
        ease: 'none', // Rotação constante
        repeat: -1,
        overwrite: false,
        force3D: !isLowEnd
      })
      
      // Rotação adicional com wobble (oscilação natural) usando GSAP (apenas se não for low-end)
      let wobbleAnim = null
      if (!isLowEnd) {
        wobbleAnim = gsap.to(leaf, {
          rotation: `+=${15 + Math.random() * 10}`,
          duration: 2.5 + Math.random() * 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          overwrite: false
        })
      }
      
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
      
      // Animações GSAP avançadas para elementos individuais do SVG
      const svg = leaf.querySelector('svg')
      if (svg) {
        // Animar pétalas individuais com movimento suave
        const petals = svg.querySelectorAll('[data-petal-group="petals"]')
        petals.forEach((petal, idx) => {
          const petalAnim = gsap.timeline({ repeat: -1 })
          petalAnim
            .to(petal, {
              rotation: `+=${2 + Math.random() * 3}`,
              transformOrigin: '70px 70px',
              duration: 4 + Math.random() * 2,
              ease: 'sine.inOut'
            })
            .to(petal, {
              rotation: `-=${2 + Math.random() * 3}`,
              duration: 4 + Math.random() * 2,
              ease: 'sine.inOut'
            })
          petalAnim.delay(idx * 0.4)
          allAnimations.push(petalAnim)
        })
        
        // Animar linhas das pétalas (brilho pulsante)
        const petalLines = svg.querySelectorAll('[data-petal-line]')
        petalLines.forEach((line, idx) => {
          const lineAnim = gsap.to(line, {
            opacity: 0.6 + Math.random() * 0.3,
            strokeWidth: 0.6 + Math.random() * 0.4,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: idx * 0.3
          })
          allAnimations.push(lineAnim)
        })
        
        // Animar centro com pulsação suave
        const centerBase = svg.querySelector('[data-center-base="base"]')
        if (centerBase) {
          const centerPulse = gsap.to(centerBase, {
            scale: 1.05,
            opacity: 0.95,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })
          allAnimations.push(centerPulse)
        }
        
        // Animar brilhos (shines) com movimento
        const shines = svg.querySelectorAll('[data-shine]')
        shines.forEach((shine, idx) => {
          const shineAnim = gsap.timeline({ repeat: -1 })
          shineAnim
            .to(shine, {
              opacity: 0.2 + Math.random() * 0.2,
              scale: 1.1,
              duration: 2 + Math.random() * 1.5,
              ease: 'sine.inOut'
            })
            .to(shine, {
              opacity: 0.3 + Math.random() * 0.15,
              scale: 1.0,
              duration: 2 + Math.random() * 1.5,
              ease: 'sine.inOut'
            })
          shineAnim.delay(idx * 0.5)
          allAnimations.push(shineAnim)
        })
        
        // Animar estames (movimento sutil)
        const stamens = svg.querySelectorAll('[data-stamen]')
        stamens.forEach((stamen, idx) => {
          const stamenAnim = gsap.to(stamen, {
            opacity: 0.5 + Math.random() * 0.2,
            strokeWidth: 0.8 + Math.random() * 0.4,
            duration: 2.5 + Math.random() * 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: idx * 0.2
          })
          allAnimations.push(stamenAnim)
        })
        
        // Animar pontos dos estames
        const stamenDots = svg.querySelectorAll('[data-stamen-dot]')
        stamenDots.forEach((dot, idx) => {
          const dotAnim = gsap.to(dot, {
            scale: 1.2,
            opacity: 0.7 + Math.random() * 0.2,
            duration: 2 + Math.random() * 1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: idx * 0.15
          })
          allAnimations.push(dotAnim)
        })
      }
      
      // Sincronizar todas as animações GSAP
      leaves.push(leaf)
      allAnimations.push(fallAnim, horizontalAnim, rotationAnim, fadeOutAnim)
      if (waveAnim) allAnimations.push(waveAnim)
      if (wobbleAnim) allAnimations.push(wobbleAnim)
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
  }, [leafCount, isLowEnd])

  return (
    <div 
      ref={containerRef} 
      className="sakura-container" 
      aria-hidden="true"
    ></div>
  )
}

export default memo(SakuraLeaves)
