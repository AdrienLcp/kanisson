'use client'

import { DEFAULT_LOCALE, getValidLocale } from '@/i18n'
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

type LinkProps = React.PropsWithChildren & NextLinkProps & {
  className?: string
}

type Href = NextLinkProps['href']
type Params = Record<string, string | string[]> | null

const getHrefWithLocale = (params: Params, href: Href) => {
  const locale = getValidLocale(params?.locale)
  return locale === DEFAULT_LOCALE
    ? href
    : `/${locale}${href}`
}

export const Link: React.FC<LinkProps> = ({ children, className, href, ...props }) => {
  const params = useParams()
  const hrefWithLocale = getHrefWithLocale(params, href)

  return (
    <NextLink {...props} className={className} href={hrefWithLocale}>
      {children}
    </NextLink>
  )
}
