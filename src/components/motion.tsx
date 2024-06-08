'use client'

import { type AnimationProps, motion, type MotionProps as FramerMotionProps } from 'framer-motion'
import React from 'react'

type Animation = 'accordion' | 'fade-in' | 'fade-in-slow' | 'rotate' | 'scale'

type MotionProps = FramerMotionProps & {
  /**
   * The animation name to apply to the children.
   * @values 'accordion', 'fade-in', 'rotate', 'scale'
   */
  animation: Animation

  /**
   * Additional class names to apply to the motion component.
   */
  className?: string
}

const animationsMap: Record<Animation, AnimationProps> = {
  'accordion': {
    initial: { originY: 0, scaleY: 0, opacity: 0 },
    animate: { scaleY: 1, opacity: 1 },
    transition: { type: 'spring', duration: 0.2 }
  },
  'fade-in': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { type: 'spring', duration: 0.15 }
  },
  'fade-in-slow': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { type: 'spring', duration: 0.5, delay: 1 }
  },
  'rotate': {
    animate: { rotate: 360 },
    transition: { type: 'spring', duration: 1, repeat: Infinity }
  },
  'scale': {
    initial: { scale: 5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: 'spring', duration: 0.7 }
  }
} as const

/**
 * Motion component that applies a predefined animation to its children.
 */
export const Motion: React.FC<MotionProps> = ({ animation, children, className, ...props }) => {
  const animationProps = animationsMap[animation]

  return (
    <motion.span {...animationProps} {...props} className={className}>
      {children}
    </motion.span>
  )
}
