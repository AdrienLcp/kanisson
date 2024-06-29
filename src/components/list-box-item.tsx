import React from 'react'
import {
  ListBoxItem as ReactAriaListBoxItem,
  type ListBoxItemProps
} from 'react-aria-components'

import { getReactAriaClassName } from '@/helpers/styles'

import './list-box-item.styles.sass'

export const ListBoxItem: React.FC<ListBoxItemProps> = ({ className, children, ...props }) => (
  <ReactAriaListBoxItem
    {...props}
    className={(values) => getReactAriaClassName(values, className, 'list-box-item')}
  >
    {children}
  </ReactAriaListBoxItem>
)
