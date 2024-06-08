import React from 'react'
import { ListBox, ListBoxItem, Separator, type Key, type ListBoxProps } from 'react-aria-components'

import { MenuItem } from '@/components/menu-item'
import { getReactAriaClassName } from '@/helpers/styles'
import type { Option } from '@/helpers/ui'

import './menu.styles.sass'

type MenuProps <T extends Key> = ListBoxProps<T> & {
  items: Array<Option<T>>
}

const handleItemClick = <T extends Key> (item?: Option<T>) => {
  if (item?.onClick !== undefined) {
    item.onClick(item)
  }
}

export function Menu <T extends Key> ({ className, ...props }: MenuProps<T>) {
  return (
    <ListBox
      className={(values) => getReactAriaClassName(values, className, 'menu')}
      {...props}
    >
      {(item) => {
        if (item.isPrefixedByDivider === true) {
          return <Separator className='menu__separator' />
        }

        return (
          <ListBoxItem
            isDisabled={item.isDisabled}
            key={item.key}
            onAction={() => handleItemClick(item)}
            textValue={item.label}
            value={item}
          >
            <MenuItem
              Icon={item.Icon}
              isDisabled={item.isDisabled}
              isSelected={item.isSelected}
              label={item.label}
            />
          </ListBoxItem>
        )
      }}
    </ListBox>
  )
}
