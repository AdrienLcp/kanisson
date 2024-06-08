'use client'

import React from 'react'
import {
  Dialog as ReactAriaDialog,
  DialogTrigger,
  type DialogProps as ReactAriaDialogProps,
  type PopoverProps
} from 'react-aria-components'

import { Popover } from '@/components/popover'
import { classNames } from '@/helpers/styles'

import './dialog.styles.sass'

type DialogProps = ReactAriaDialogProps & React.PropsWithChildren & {
  placement: PopoverProps['placement']
  Trigger: React.ReactNode
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  className,
  placement,
  Trigger,
  ...props
}) => (
  <DialogTrigger>
    {Trigger}

    <Popover placement={placement} className='dialog__wrapper'>
      <ReactAriaDialog {...props} className={classNames('dialog', className)}>
        {children}
      </ReactAriaDialog>
    </Popover>
  </DialogTrigger>
)
