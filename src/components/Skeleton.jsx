import './Skeleton.css'

function Skeleton({ variant = 'text', width, height, className = '' }) {
  const style = {}
  if (width) style.width = width
  if (height) style.height = height

  return (
    <div
      className={`skeleton skeleton-${variant} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div className="skeleton-shimmer"></div>
    </div>
  )
}

export default Skeleton

