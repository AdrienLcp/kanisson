'use client'

import React from 'react'

import { PageTitle } from '@/app/components/page-title'
import { isValidString } from '@/helpers/strings'
import { classNames } from '@/helpers/styles'
import { useI18n } from '@/i18n/client'
import type { RouteKey } from '@/routes'

import './page-wrapper.styles.sass'

type PageWrapperProps = React.PropsWithChildren & {
  /* Additional className. */
  className?: string

  /* Displays the matching page title when provided. */
  titleRouteKey?: RouteKey
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className, titleRouteKey }) => {
  const { i18n } = useI18n()

  return (
    <div className={classNames('page-wrapper', className)}>
      {isValidString(titleRouteKey) && (
        <header>
          <PageTitle>
            {i18n(`routes.${titleRouteKey}.page-title`)}
          </PageTitle>
        </header>
      )}

      <div className={className}>
        {children}
      </div>
    </div>
  )
}
