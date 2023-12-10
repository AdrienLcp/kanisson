import { Save, type LucideIcon } from 'lucide-react'

import { Button, Loader } from '@/Components'
import { cn } from '@/Lib'

import styles from './submit-button.styles.module.sass'

type SubmitButtonProps = {
  label?: string
  Icon?: LucideIcon
  isLoading?: boolean
  isDisabled?: boolean
  className?: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, Icon, isLoading, isDisabled, className }) => {
  const DefaultIcon = Icon ?? Save

  return (
    <Button
      type='submit'
      size={Icon && !label ? 'icon' : 'default'}
      className={cn(styles['submit-button'], className)}
      disabled={isLoading || isDisabled}
    >
      {isLoading
        ? <Loader />
        : <DefaultIcon size='1.4em' />
      }

      {label}
    </Button>
  )
}

export default SubmitButton
