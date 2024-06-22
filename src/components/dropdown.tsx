'use client'

import React from 'react'
import { Menu, MenuTrigger, type MenuProps, type Key, MenuItem } from 'react-aria-components'

import { OptionItem, type Option } from '@/components/option-item'
import { Popover } from '@/components/popover'
import { classNames } from '@/helpers/styles'

import './dropdown.styles.sass'

type BaseMenuProps <T> = Omit<MenuProps<T>, 'items'>
type BaseDropdownProps <T extends Key> = {
  /**
   * The items to display in the dropdown.
   */
  items: Array<Option<T>>,

  /**
   * The function to call when an item is clicked.
   */
  onClickItem?: (item: Option<T>) => void
}

type DropdownProps <T extends Key> =
  React.PropsWithChildren &
  BaseMenuProps<T> &
  BaseDropdownProps<T>

function handleClickItem <T extends Key> (item: Option<T>, onClickItem?: (item: Option<T>) => void) {
  if (typeof onClickItem === 'function') {
    onClickItem(item)
  }

  if (typeof item.onClick === 'function') {
    item.onClick(item)
  }
}

/**
 * Dropdown component that displays options.
 */
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
            <MenuItem
              className='dropdown__item'
              key={item.key}
              onAction={() => handleClickItem(item, onClickItem)}
            >
              <OptionItem
                className={item.className}
                Icon={item.Icon}
                isDisabled={item.isDisabled}
                isPrefixedByDivider={item.isPrefixedByDivider}
                isSelected={item.isSelected}
                key={item.key}
                label={item.label}
              />
            </MenuItem>
          )}
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}
