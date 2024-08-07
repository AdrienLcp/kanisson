'use client'

import React from 'react'

const MOBILE_BREAKPOINT = 992

export const useBreakpoints = () => {
  const [isMobile, setIsMobile] = React.useState<boolean>(true)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}
