import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Toast.css'

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  const toastRef = useRef(null)

  useEffect(() => {
    const toast = toastRef.current
    if (!toast) return

    // Animação de entrada
    gsap.fromTo(toast,
      {
        opacity: 0,
        y: -50,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }
    )

    // Auto-close com animação de saída
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        if (toast && onClose && typeof onClose === 'function') {
          gsap.to(toast, {
            opacity: 0,
            y: -50,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              if (onClose) onClose()
            },
          })
        }
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    const toast = toastRef.current
    if (toast && onClose) {
      gsap.to(toast, {
        opacity: 0,
        y: -50,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (onClose) onClose()
        },
      })
    }
  }

  return (
    <div
      ref={toastRef}
      className={`toast toast-${type}`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="toast-content">
        <span className="toast-icon">
          {type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
        </span>
        <span className="toast-message">{message}</span>
      </div>
      <button
        className="toast-close"
        onClick={handleClose}
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  )
}

export default Toast

