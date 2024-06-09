'use client'

import React from 'react'

import { Motion } from '@/components/motion'
import { BottomBar } from '@/routes/components/bottom-bar'
import { SideBar } from '@/routes/components/side-bar'

// Side bar above 992px
// Bottom bar below 991px
const NAVBAR_BREAKPOINT = 992

const renderNavbar = (isMobile: boolean | null) => {
  if (isMobile === null) {
    return null
  }

  if (isMobile) {
    return <BottomBar />
  }

  return <SideBar />
}

export const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < NAVBAR_BREAKPOINT)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Motion animation='fade-in-slow'>
      {renderNavbar(isMobile)}
    </Motion>
  )
}
