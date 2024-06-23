'use client'

import { type AnimationProps, motion, type MotionProps as FramerMotionProps } from 'framer-motion'
import React from 'react'

type Animation = 'accordion' | 'fade-in' | 'fade-in-slow' | 'infinite-rotate' | 'scale'

type MotionProps = FramerMotionProps & {
  /**
   * The animation name to apply to the children.
   * @values 'accordion', 'fade-in', 'fade-in-slow', 'infinite-rotate', 'scale'
   */
  animation: Animation

  /** Additional class names to apply to the motion component. */
  className?: string

  /** Override the default delay of the animation. */
  delay?: number

  /** Override the default duration of the animation. */
  duration?: number
}

const animationsMap: Record<Animation, AnimationProps> = {
  'accordion': {
    initial: { originY: 0, scaleY: 0, opacity: 0 },
    animate: { scaleY: 1, opacity: 1 },
    transition: { type: 'spring', duration: 0.15 }
  },
  'fade-in': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { type: 'spring', duration: 0.4  }
  },
  'fade-in-slow': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { type: 'spring', duration: 1, delay: 0.25 }
  },
  'infinite-rotate': {
    animate: { rotate: 360 },
    transition: { type: 'spring', duration: 1, repeat: Infinity }
  },
  'scale': {
    initial: { scale: 5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: 'spring', duration: 0.7 }
  }
} as const

const getAnimationProps = (animation: Animation, delay?: number, duration?: number) => {
  const selectedAnimationProps = animationsMap[animation] ?? animationsMap['fade-in']

  const animationProps: AnimationProps = {
    ...selectedAnimationProps,
    transition: {
      ...selectedAnimationProps.transition,
      // @ts-expect-error the type definition for `transition` is incorrect.
      duration: duration ?? selectedAnimationProps.transition?.duration,
      delay: delay ?? selectedAnimationProps.transition?.delay
    }
  }

  return animationProps
}

/**
 * Motion component that applies a predefined animation to its children.
 */
export const Motion: React.FC<MotionProps> = ({
  animation,
  children,
  className,
  delay,
  duration,
  ...props
}) => {
  const animationProps = getAnimationProps(animation, delay, duration)

  return (
    <motion.span {...animationProps} {...props} className={className}>
      {children}
    </motion.span>
  )
}
