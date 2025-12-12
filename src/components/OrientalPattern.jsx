import './OrientalPattern.css'

function OrientalPattern({ type = 'waves' }) {
  return (
    <div className={`oriental-pattern pattern-${type}`} aria-hidden="true">
      {type === 'waves' && (
        <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="pattern-svg">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#C62828', stopOpacity: 0.1 }} />
              <stop offset="50%" style={{ stopColor: '#F9A825', stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: '#C62828', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q50,30 100,50 T200,50 L200,100 L0,100 Z"
            fill="url(#waveGrad)"
            className="wave-path"
          />
          <path
            d="M0,60 Q50,40 100,60 T200,60 L200,100 L0,100 Z"
            fill="url(#waveGrad)"
            className="wave-path"
            style={{ opacity: 0.6 }}
          />
        </svg>
      )}
      {type === 'circles' && (
        <div className="circle-pattern">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      )}
    </div>
  )
}

export default OrientalPattern

