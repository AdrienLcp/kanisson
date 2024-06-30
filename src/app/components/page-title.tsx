import React from 'react'

import { classNames } from '@/helpers/styles'
import { areValidChildren } from '@/lib/react'

import './page-title.styles.sass'

type PageTitleProps = React.PropsWithChildren & {
  className?: string
}

export const PageTitle: React.FC<PageTitleProps> = ({ children, className }) => {
  if (!areValidChildren(children)) {
    return null
  }

  return (
    <h2 className={classNames('page-title', className)}>
      {children}
    </h2>
  )
}
