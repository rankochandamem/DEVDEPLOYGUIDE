export default function Button({ children, variant = 'primary', onClick, className = '', type = 'button', ...props }) {
  const variantClass = variant === 'secondary' ? 'secondary-btn' : 'primary-btn'

  return (
    <button type={type} className={`${variantClass} ${className}`.trim()} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
