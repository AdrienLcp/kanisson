import React from 'react'
import {
  ComboBox as ReactAriaComboBox,
  type ComboBoxProps as ReactAriaComboBoxProps,
  Input,
  type Key
} from 'react-aria-components'

import { Chevron } from '@/components/chevron'
import { BasePicker, type CommonPickerProps, type Items, type OnSelect } from '@/components/forms/base-picker'
import type { Option } from '@/components/option-item'
import { Pressable } from '@/components/pressable'
import { DEFAULT_MENU_MIN_WIDTH, getReactAriaClassName } from '@/helpers/styles'

import './combo-box.styles.sass'

type ComboBoxProps <T extends Key> = ReactAriaComboBoxProps<Option<T>> & CommonPickerProps<T> & {
  /** Temporary text that occupies the text input when it is empty. */
  placeholder?: string
}

function handleSelectItem <T extends Key> (key: Key | null, items: Items<T>, onSelect: OnSelect<T>) {
  const selectedItem = items.find(item => item.key === key)

  if (selectedItem === undefined) {
    return
  }

  if (typeof selectedItem.onClick === 'function') {
    selectedItem.onClick(selectedItem)
  }

  if (typeof onSelect === 'function') {
    onSelect(selectedItem)
  }
}

export function ComboBox <T extends Key> ({
  className,
  label,
  isDisabled,
  items,
  onOpenChange,
  onSelect,
  placeholder,
  selectedKey,
  ...props
}: ComboBoxProps<T>) {
  const [isComboBoxMenuOpen, setIsComboBoxMenuOpen] = React.useState<boolean>(false)
  const [comboBoxMenuMinWidth, setComboBoxMenuMinWidth] = React.useState<number>(DEFAULT_MENU_MIN_WIDTH)

  const comboBoxRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (comboBoxRef.current !== null) {
      setComboBoxMenuMinWidth(comboBoxRef.current.offsetWidth)
    }
  }, [comboBoxRef])

  return (
    <ReactAriaComboBox
      {...props}
      className={(values) => getReactAriaClassName(values, className, 'combo-box')}
      isDisabled={isDisabled}
      onOpenChange={(isOpen) => {
        setIsComboBoxMenuOpen(isOpen)

        if (typeof onOpenChange === 'function') {
          onOpenChange(isOpen)
        }
      }}
      onSelectionChange={(key) => handleSelectItem(key, items, onSelect)}
    >
      <BasePicker
        items={items}
        label={label}
        menuMinWidth={comboBoxMenuMinWidth}
        selectedKey={selectedKey}
      >
        <div
          className='combo-box__control'
          ref={comboBoxRef}
        >
          <Input
            className='combo-box__control__input'
            placeholder={placeholder}
          />

          <Pressable className='combo-box__control__button'>
            <Chevron isRotated={isComboBoxMenuOpen} />
          </Pressable>
        </div>
      </BasePicker>
    </ReactAriaComboBox>
  )
}
