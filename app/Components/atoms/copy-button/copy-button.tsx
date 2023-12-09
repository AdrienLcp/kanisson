'use client'

import { Check, Copy } from 'lucide-react'

import { useClipboard, useLocale } from '@/Hooks'
import { Button, Tooltip } from '@/Components'

import styles from './copy-button.styles.module.sass'

type CopyButtonProps = {
  string: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ string }) => {
  const [copied, copy] = useClipboard()
  const { dictionary } = useLocale()
  const strings = dictionary.components.copyButton

  return (
    <div className={styles['copy-button']}>
      {copied
        ? <Check color='hsl(var(--green-foreground))' />
        : <Tooltip content={strings.tooltip}>
            <Button
              size='icon'
              variant='ghost'
              onClick={() => copy(string)}
            >
              {copied ? <Check color='hsl(var(--green-foreground))' /> : <Copy />}
            </Button>
          </Tooltip>
      }
    </div>
  )
}

export default CopyButton
