'use client'

import { XIcon } from 'lucide-react'
import React from 'react'
import toast, { Toaster as BaseToaster, ToastBar, type ToastPosition, type ToasterProps } from 'react-hot-toast'

import { Button } from '@/components/button'
import { useBreakpoints } from '@/hooks/breakpoints'

import './toaster.styles.sass'

export const Toaster: React.FC<ToasterProps> = ({ ...props }) => {
  const isMobile = useBreakpoints()

  const toasterPosition: ToastPosition = isMobile
    ? 'top-center'
    : 'bottom-right'

  return (
    <BaseToaster
      position={toasterPosition}
      toastOptions={{ duration: 10000 }}
      {...props}
    >
      {(currentToast) => (
        <ToastBar
          position={toasterPosition}
          style={{
            backgroundColor: 'hsl(var(--secondary, 240 3.7% 15.9%))',
            color: 'hls(var(--foreground, 0 0% 98%))'
          }}
          toast={currentToast}
        >
          {({ icon, message }) => (
            <div className='toast'>
              {icon}

              <div className='toast__message'>
                {message}
              </div>

              {currentToast.type !== 'loading' && (
                <Button
                  Icon={XIcon}
                  onPress={() => toast.dismiss(currentToast.id)}
                  size='icon'
                  variant='ghost'
                />
              )}
            </div>
          )}
        </ToastBar>
      )}
    </BaseToaster>
  )
}
