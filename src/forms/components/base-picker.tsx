import React from 'react'
import { type Key, ListBox } from 'react-aria-components'

import { ListBoxItem } from '@/components/list-box-item'
import { Motion } from '@/components/motion'
import { type Option, OptionItem } from '@/components/option-item'
import { Popover } from '@/components/popover'
import type { CommonFormFieldProps } from '@/forms'
import { BaseField } from '@/forms/components/base-field'
import type { Style } from '@/helpers/styles'

import './base-picker.styles.sass'

export type Items <T extends Key> = Array<Option<T>>
export type OnSelect <T extends Key> = ((item: Option<T>) => void) | undefined

export type CommonPickerProps <T extends Key> = CommonFormFieldProps & {
  /**
   * Items to display in the select component.
   */
  items: Items<T>

  /**
   * The function to call when user click on select option.
   */
  onSelect?: OnSelect<T>
}

type BasePickerProps <T extends Key> =
  React.PropsWithChildren &
  Pick<CommonPickerProps<T>, 'items' | 'label'> &
  CommonFormFieldProps & {
  /**
   * Min width of the list box.
   */
  menuMinWidth?: number

  /**
   * Selected key of the picker.
   */
  selectedKey?: Key | null
}

export function BasePicker <T extends Key> ({
  children,
  description,
  isRequired,
  items,
  label,
  menuMinWidth,
  selectedKey
}: BasePickerProps<T>) {
  const listBoxStyle: Style = {
    '--picker-menu-min-width': `${menuMinWidth}px`
  }

  return (
    <>
      <BaseField
        description={description}
        isRequired={isRequired}
        label={label}
      >
        {children}
      </BaseField>

      <Popover>
        <Motion animation='fade-in'>
          <ListBox
            className='base-picker__list-box'
            items={items}
            style={listBoxStyle}
          >
            {item => (
              <ListBoxItem
                key={item.key}
                textValue={item.label}
              >
                <OptionItem
                  className={item.className}
                  Icon={item.Icon}
                  isDisabled={item.isDisabled}
                  isPrefixedByDivider={item.isPrefixedByDivider}
                  isSelected={item.key === selectedKey}
                  key={item.key}
                  label={item.label}
                />
              </ListBoxItem>
            )}
          </ListBox>
        </Motion>
      </Popover>
    </>
  )
}
