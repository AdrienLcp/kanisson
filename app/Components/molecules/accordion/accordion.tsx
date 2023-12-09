import { Accordion as ShadcnAccordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/base/ui/accordion'

type AccordionProps = React.PropsWithChildren<{
  title?: string
}>

const Accordion: React.FC<AccordionProps> = ({ children, title }) => {
  return (
    <ShadcnAccordion
      type='single'
      collapsible
    >
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          {title}
        </AccordionTrigger>
        <AccordionContent>
          {children}
        </AccordionContent>          
      </AccordionItem>
    </ShadcnAccordion>
  )
}

export default Accordion
