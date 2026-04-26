import { cn } from '@utils/helpers'
import './Divider.css'

const Divider = ({ label, variant = 'default', className = '' }) => (
  <div className={cn('divider', `divider--${variant}`, label && 'divider--labeled', className)} aria-hidden="true">
    {label && <span className="divider__label">{label}</span>}
  </div>
)

export default Divider
