import { ChevronDown } from 'lucide-react'
import React from 'react'
import {
  type Key,
  ListBox,
  Select as ReactAriaSelect,
  type SelectProps as ReactAriaSelectProps,
  ListBoxItem
} from 'react-aria-components'

import { Label } from '@/components/label'
import { type Option, OptionItem } from '@/components/option-item'
import { Popover } from '@/components/popover'
import { Pressable } from '@/components/pressable'
import { isValidString } from '@/helpers/strings'
import { classNames, getReactAriaClassName } from '@/helpers/styles'

import './select.styles.sass'

type Items <T extends Key> = Array<Option<T>>
type OnSelect <T extends Key> = ((item: Option<T>) => void) | undefined

type SelectProps <T extends Key> = ReactAriaSelectProps<Option<T>> & {
  /**
   * Items to display in the select component.
   */
  items: Array<Option<T>>

  /**
   * The label of the select component, displayed above the select input.
   */
  label?: string

  /**
   * The function to call when user click on select option.
   */
  onSelect?: OnSelect<T>
}

function handleSelectItem <T extends Key> (key: Key, items: Items<T>, onSelect: OnSelect<T>) {
  const selectedItem = items.find(item => item.id === key)

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

function renderValue <T extends Key> (items: Items<T>, selectedKey?: Key | null, placeholder?: string) {
  const selectedOption = items.find(item => item.id === selectedKey)

  if (selectedOption !== undefined) {
    return (
      <span className='select__input__value'>
        {selectedOption.label}
      </span>
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
  items,
  onOpenChange,
  onSelect,
  placeholder,
  selectedKey,
  ...props
}: SelectProps<T>) {
  const [isSelectMenuOpen, setIsSelectMenuOpen] = React.useState<boolean>(false)

  return (
    <ReactAriaSelect
      {...props}
      className={(values) => getReactAriaClassName(values, className, 'select')}
      onOpenChange={(isOpen) => {
        setIsSelectMenuOpen(isOpen)

        if (typeof onOpenChange === 'function') {
          onOpenChange(isOpen)
        }
      }}
    >
      <Label>{label}</Label>

      <Pressable className='select__input'>
        {renderValue(items, selectedKey, placeholder)}

        <ChevronDown className={classNames(isSelectMenuOpen && 'rotated')} />
      </Pressable>

      <Popover>
        <ListBox
          className='select__list-box'
          items={items}
          onAction={(key) => handleSelectItem(key, items, onSelect)}
        >
          {item =>  (
            <ListBoxItem
              className='select__list-box__item'
              textValue={item.label}
            >
              <OptionItem {...item} />
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </ReactAriaSelect>
  )
}
