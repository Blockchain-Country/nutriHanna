import { cn } from '@utils/helpers'
import './Container.css'

const Container = ({ size = 'default', className = '', children, ...props }) => (
  <div className={cn('container', `container--${size}`, className)} {...props}>
    {children}
  </div>
)

export default Container
