import './LoadingSpinner.css'

function LoadingSpinner({ size = 'medium', fullScreen = false }) {
  const sizeClass = `spinner-${size}`
  const containerClass = fullScreen ? 'spinner-fullscreen' : 'spinner-container'

  return (
    <div className={containerClass} role="status" aria-label="Carregando">
      <div className={`spinner ${sizeClass}`}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <span className="sr-only">Carregando...</span>
    </div>
  )
}

export default LoadingSpinner

