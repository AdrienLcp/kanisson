'use client'

import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import React from 'react'

import type { RoutePath } from '@/routes'
import { useNavigation } from '@/routes/navigation'

type LinkProps = NextLinkProps & {
  children?: React.ReactNode
  className?: string
  href: RoutePath
}

export const Link: React.FC<LinkProps> = ({ children, href, ...props }) => {
  const navigate = useNavigation()

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    navigate(href)
  }

  return (
    <NextLink
      href={href}
      onClick={handleLinkClick}
      {...props}
    >
      {children}
    </NextLink>
  )
}
