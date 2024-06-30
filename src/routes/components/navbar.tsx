'use client'

import React from 'react'

import type { Permission } from '@/authentication/permissions'
import { Motion } from '@/components/motion'
import { BottomBar } from '@/routes/components/bottom-bar'
import { SideBar } from '@/routes/components/side-bar'
import { useBreakpoints } from '@/hooks/breakpoints'

export type NavBarProps = {
  authenticatedUserPermissions: Permission[]
}

// Side bar above 992px
// Bottom bar below 991px
const renderNavbar = (isMobile: boolean | null, navBarProps: NavBarProps) => {
  if (isMobile === null) {
    return null
  }

  if (isMobile) {
    return <BottomBar {...navBarProps} />
  }

  return <SideBar {...navBarProps} />
}

export const Navbar: React.FC<NavBarProps> = (navBarProps) => {
  const isMobile = useBreakpoints()

  return (
    <Motion animation='fade-in-slow'>
      {renderNavbar(isMobile, navBarProps)}
    </Motion>
  )
}
