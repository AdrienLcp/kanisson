import React from 'react'

import { PageTitle } from '@/app/components/page-title'
import { classNames } from '@/helpers/styles'

import './page-wrapper.styles.sass'

type PageWrapperProps = React.PropsWithChildren & {
  className?: string
  title?: string
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className, title }) => (
  <div className={classNames('page-wrapper', className)}>
    <header>
      <PageTitle>
        {title}
      </PageTitle>
    </header>

    <div className='page-wrapper__content'>
      {children}
    </div>
  </div>
)
