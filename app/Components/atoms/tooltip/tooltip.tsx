import { Tooltip as ShadcnTooltip, TooltipContent, TooltipTrigger } from '@/Components/base/ui/tooltip'

type TooltipProps = React.PropsWithChildren<{
  content?: React.ReactNode
  asChild?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

const Tooltip: React.FC<TooltipProps> = ({ asChild, children, content, side}) => {
  return (
    <ShadcnTooltip>
      <TooltipTrigger asChild={asChild}>
        <>
          {children}
        </>
      </TooltipTrigger>
      <TooltipContent side={side}>
        {content}
      </TooltipContent>
    </ShadcnTooltip>
  )
}

export default Tooltip
