import React from 'react'
import {
  type Key,
  Select as ReactAriaSelect,
  type SelectProps as ReactAriaSelectProps
} from 'react-aria-components'

import { Chevron } from '@/components/chevron'
import { BasePicker, type CommonPickerProps, type Items, type OnSelect } from '@/forms/components/base-picker'
import { type Option, OptionItem } from '@/components/option-item'
import { Pressable } from '@/components/pressable'
import { isValidString } from '@/helpers/strings'
import { classNames, DEFAULT_MENU_MIN_WIDTH, getReactAriaClassName } from '@/helpers/styles'

import './select.styles.sass'

type SelectProps <T extends Key> = ReactAriaSelectProps<Option<T>> & CommonPickerProps<T>

function handleSelectItem <T extends Key> (key: Key, items: Items<T>, onSelect: OnSelect<T>) {
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

function renderValue <T extends Key> (items: Items<T>, selectedKey?: Key | null, placeholder?: string, isDisabled?: boolean) {
  const selectedOption = items.find(item => item.key === selectedKey)

  if (selectedOption !== undefined) {
    return (
      <OptionItem
        className={classNames('select__input__value', selectedOption.className)}
        Icon={selectedOption.Icon}
        isDisabled={isDisabled}
        key={selectedOption.key}
        label={selectedOption.label}
      />
    )
  }

  if (isValidString(placeholder)) {
    return (
      <span className='select__input__placeholder'>
        {placeholder}
      </span>
    )
  }
}

/**
 * Select component that displays options.
 */
export function Select <T extends Key> ({
  className,
  label,
  isDisabled,
  items,
  onOpenChange,
  onSelect,
  placeholder,
  selectedKey,
  ...props
}: SelectProps<T>) {
  const [isSelectMenuOpen, setIsSelectMenuOpen] = React.useState<boolean>(false)
  const [selectMenuMinWidth, setSelectMenuMinWidth] = React.useState<number>(DEFAULT_MENU_MIN_WIDTH)

  const selectRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (selectRef.current !== null) {
      setSelectMenuMinWidth(selectRef.current.offsetWidth)
    }
  }, [selectRef])

  return (
    <ReactAriaSelect
      {...props}
      className={(values) => getReactAriaClassName(values, className, 'select')}
      isDisabled={isDisabled}
      onOpenChange={(isOpen) => {
        setIsSelectMenuOpen(isOpen)

        if (typeof onOpenChange === 'function') {
          onOpenChange(isOpen)
        }
      }}
      onSelectionChange={(key) => handleSelectItem(key, items, onSelect)}
    >
      <BasePicker
        items={items}
        label={label}
        menuMinWidth={selectMenuMinWidth}
        selectedKey={selectedKey}
      >
        <div ref={selectRef}>
          <Pressable className='select__input'>
            {renderValue(items, selectedKey, placeholder, isDisabled)}

            <Chevron isRotated={isSelectMenuOpen} />
          </Pressable>
        </div>
      </BasePicker>
    </ReactAriaSelect>
  )
}
