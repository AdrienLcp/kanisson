import React from 'react'

import { isValidString } from '@/helpers/strings'
import { classNames } from '@/helpers/styles'

import './section.styles.sass'

type SectionProps = React.ComponentProps<'section'> & {
  /**
   * Title of the section.
   */
  title?: string

  /**
   * Subtitle / description of the section.
   */
  subtitle?: string
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  subtitle,
  title,
  ...props
}) => (
  <section {...props} className={classNames('section', className)}>
    <header className='section__header'>
      {isValidString(title) && (
        <h2 className='section__header__title'>
          {title}
        </h2>
      )}

      {isValidString(subtitle) && (
        <p className='section__header__subtitle'>
          {subtitle}
        </p>
      )}
    </header>

    <div>
      {children}
    </div>
  </section>
)
