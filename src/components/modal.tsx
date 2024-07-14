'use client'

import { XIcon } from 'lucide-react'
import React from 'react'
import { Dialog, DialogTrigger, Heading, Modal as ReactAriaModal, type DialogTriggerProps } from 'react-aria-components'

import { Button } from '@/components/button'
import { classNames } from '@/helpers/styles'

import './modal.styles.sass'

type ModalProps = React.PropsWithChildren & DialogTriggerProps &{
  className?: string
  title?: string
  Trigger: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ children, className, title, Trigger, ...props }) => {
  return (
    <DialogTrigger {...props}>
      {Trigger}

      <ReactAriaModal>
        <Dialog>
          {({ close }) => (
            <>
              <div className='modal-overlay' onClick={close} />

              <section className='modal'>
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

                <div className={classNames('modal__content', className)}>
                  {children}
                </div>
              </section>
            </>
          )}
        </Dialog>
      </ReactAriaModal>
    </DialogTrigger>
  )
}
