import { ShadcnButton, type ShadcnButtonProps } from '@/Components/base/ui/button'

type ButtonProps = ShadcnButtonProps & {
  
}

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <ShadcnButton {...props} />
  )
}

export default Button
