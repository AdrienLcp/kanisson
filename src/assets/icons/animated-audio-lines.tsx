import type { LucideProps } from 'lucide-react'
import React from 'react'

import { classNames } from '@/helpers/styles'

import './animated-audio-lines.styles.sass'

type AnimatedAudioLinesProps = LucideProps & {
  isActive?: boolean
}

export const AnimatedAudioLines: React.FC<AnimatedAudioLinesProps> = ({ isActive, ...props }) => (
  <svg
    className={classNames('animated-audio-lines', isActive && 'active')}
    fill='none'
    height='24'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path d='M2 10v3'/>
    <path d='M6 6v11'/>
    <path d='M10 3v18'/>
    <path d='M14 8v7'/>
    <path d='M18 5v13'/>
    <path d='M22 10v3'/>
  </svg>
)
