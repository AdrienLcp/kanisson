import { ChevronDown, type LucideProps } from 'lucide-react'
import React from 'react'

import { DEFAULT_ICON_SIZE, classNames } from '@/helpers/styles'

import './chevron.styles.sass'

type ChevronProps = LucideProps & {
  /** Determines if the chevron should be rotated 180 degrees. */
  isRotated?: boolean
}

export const Chevron: React.FC<ChevronProps> = ({ className, isRotated, ...props }) => (
  <ChevronDown
    size={DEFAULT_ICON_SIZE}
    {...props}
    className={classNames('chevron', isRotated && 'rotated', className)}
  />
)
