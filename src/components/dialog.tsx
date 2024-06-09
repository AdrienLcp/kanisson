'use client'

import React from 'react'
import {
  Dialog as ReactAriaDialog,
  DialogTrigger,
  type DialogProps as ReactAriaDialogProps,
  type PopoverProps
} from 'react-aria-components'

import { Motion } from '@/components/motion'
import { Popover } from '@/components/popover'
import { classNames } from '@/helpers/styles'

import './dialog.styles.sass'

type DialogProps = ReactAriaDialogProps & React.PropsWithChildren & {
  /**
   * Placement of the dropdown menu relative to the trigger.
   * @values 'bottom', 'bottom left', 'bottom right', 'bottom start', 'bottom end', 'top', 'top left', 'top right', 'top start', 'top end', 'left', 'left top', 'left bottom', 'start', 'start top', 'start bottom', 'right', 'right top', 'right bottom', 'end', 'end top', 'end bottom'
   * @default 'bottom'
   */
  placement: PopoverProps['placement']

  /**
   * Trigger needs to be a pressable component.
   */
  Trigger: React.ReactNode
}

/**
 * A dialog component that can be triggered by a pressable component.
 */
export const Dialog: React.FC<DialogProps> = ({
  children,
  className,
  placement = 'bottom',
  Trigger,
  ...props
}) => (
  <DialogTrigger>
    {Trigger}

    <Popover placement={placement} className='dialog__popover'>
      <Motion animation='fade-in'>
        <ReactAriaDialog {...props} className={classNames('dialog', className)}>
          {children}
        </ReactAriaDialog>
      </Motion>
    </Popover>
  </DialogTrigger>
)
