'use client'

import { MailIcon, SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { LoginButton } from '@/authentication/components/login-button'
import { Button } from '@/components/button'
import { Tooltip } from '@/components/tooltip'
import { useI18n } from '@/i18n'
import { ROUTES } from '@/routes'

import './visitor-menu.styles.sass'

export const VisitorMenu: React.FC = () => {
  const { i18n } = useI18n()

  return (
    <section className='visitor-menu'>
      <Tooltip content={i18n('routes.contact.link-aria-label')}>
        <Link href={ROUTES.contact}>
          <Button
            Icon={MailIcon}
            size='icon'
            variant='outline'
          />
        </Link>
      </Tooltip>

      <Tooltip content={i18n('routes.settings.link-aria-label')}>
        <Link href={ROUTES.settings}>
          <Button
            Icon={SettingsIcon}
            size='icon'
            variant='outline'
          />
        </Link>
      </Tooltip>

      <LoginButton />
    </section>
  )
}
