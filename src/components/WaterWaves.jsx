import './WaterWaves.css'

function WaterWaves() {
  return (
    <div className="water-waves" aria-hidden="true">
      <svg className="waves-svg" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'rgba(198, 40, 40, 0.1)', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: 'rgba(249, 168, 37, 0.15)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(198, 40, 40, 0.1)', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'rgba(249, 168, 37, 0.08)', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: 'rgba(198, 40, 40, 0.12)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(249, 168, 37, 0.08)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Primeira camada de ondas */}
        <path
          className="wave wave-1"
          d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z"
          fill="url(#waveGradient1)"
        />
        
        {/* Segunda camada de ondas */}
        <path
          className="wave wave-2"
          d="M0,120 Q300,80 600,120 T1200,120 L1200,200 L0,200 Z"
          fill="url(#waveGradient2)"
        />
        
        {/* Terceira camada de ondas */}
        <path
          className="wave wave-3"
          d="M0,140 Q300,100 600,140 T1200,140 L1200,200 L0,200 Z"
          fill="url(#waveGradient1)"
          opacity="0.6"
        />
      </svg>
    </div>
  )
}

export default WaterWaves

