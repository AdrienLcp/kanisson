import React from 'react'
import { Menu, MenuTrigger, type MenuProps, type Key, MenuItem } from 'react-aria-components'

import { OptionItem, type Option } from '@/components/option-item'

import './dropdown.styles.sass'
import { classNames } from '@/helpers/styles'
import { Popover } from '@/components/popover'

type BaseMenuProps <T> = Omit<MenuProps<T>, 'items'>

type DropdownProps <T extends Key> =
  React.PropsWithChildren &
  BaseMenuProps<T> &
  { items: Iterable<Option<T>>, onClickItem?: (item: Option<T>) => void }

function handleClickItem <T extends Key> (item: Option<T>, onClickItem?: (item: Option<T>) => void) {
  if (typeof onClickItem === 'function') {
    onClickItem(item)
  }

  if (typeof item.onClick === 'function') {
    item.onClick(item)
  }
}

export function Dropdown <T extends Key> ({
  children,
  className,
  items,
  onClickItem,
  ...props
}: DropdownProps<T>) {
  return (
    <MenuTrigger>
      {children}

      <Popover>
        <Menu
          {...props}
          className={classNames('dropdown', className)}
          items={items}
        >
          {(item) => (
            <MenuItem onAction={() => handleClickItem(item, onClickItem)}>
              <OptionItem
                label={item.label}
                id={item.id}
                isSelected={item.isSelected}
                isDisabled={item.isDisabled}
                isPrefixedByDivider={item.isPrefixedByDivider}
                Icon={item.Icon}
                className={item.className}
              />
            </MenuItem>
          )}
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}
