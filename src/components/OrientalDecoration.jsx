import './OrientalDecoration.css'

function OrientalDecoration() {
  return (
    <div className="oriental-decoration" aria-hidden="true">
      {/* Símbolo de yin-yang simplificado */}
      <div className="yin-yang">
        <div className="yin-yang-circle"></div>
      </div>
      
      {/* Padrão de bambu */}
      <div className="bamboo-pattern">
        <div className="bamboo-stem"></div>
        <div className="bamboo-stem"></div>
        <div className="bamboo-stem"></div>
      </div>
      
      {/* Linhas decorativas */}
      <div className="decorative-lines">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>
    </div>
  )
}

export default OrientalDecoration

