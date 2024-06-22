import { ChevronDown, type LucideProps } from 'lucide-react'
import React from 'react'

import { classNames } from '@/helpers/styles'

import './chevron.styles.sass'

type ChevronProps = LucideProps & {
  isRotated?: boolean
}

export const Chevron: React.FC<ChevronProps> = ({ className, isRotated, ...props }) => (
  <ChevronDown {...props} className={classNames('chevron', isRotated && 'rotated', className)} />
)
