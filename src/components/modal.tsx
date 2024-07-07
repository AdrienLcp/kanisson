'use client'

import { XIcon } from 'lucide-react'
import React from 'react'
import { Dialog, DialogTrigger, Heading, Modal as ReactAriaModal } from 'react-aria-components'

import { Button } from '@/components/button'
import { classNames } from '@/helpers/styles'

import './modal.styles.sass'

type ModalProps = React.PropsWithChildren & {
  className?: string
  title?: string
  Trigger: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ children, className, title, Trigger }) => {
  return (
    <DialogTrigger>
      {Trigger}

      <ReactAriaModal>
        <Dialog>
          {({ close }) => (
            <>
              <div className='modal-overlay' onClick={close} />

              <div className={classNames('modal', className)}>
                <Heading
                  className='modal__heading'
                  slot='title'
                >
                  <span className='modal__heading__title'>
                    {title}
                  </span>

                  <Button
                    Icon={XIcon}
                    onPress={close}
                    size='icon'
                    variant='ghost'
                  />
                </Heading>

                {children}
              </div>
            </>
          )}
        </Dialog>
      </ReactAriaModal>
    </DialogTrigger>
  )
}
