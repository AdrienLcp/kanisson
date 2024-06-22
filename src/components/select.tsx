import React from 'react'
import {
  type Key,
  ListBox,
  Select as ReactAriaSelect,
  type SelectProps as ReactAriaSelectProps,
  ListBoxItem
} from 'react-aria-components'

import { Chevron } from '@/components/chevron'
import { Label } from '@/components/label'
import { type Option, OptionItem } from '@/components/option-item'
import { Popover } from '@/components/popover'
import { Pressable } from '@/components/pressable'
import { isValidString } from '@/helpers/strings'
import { type Style, classNames, getReactAriaClassName } from '@/helpers/styles'

import './select.styles.sass'
import { Motion } from '@/components/motion'

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
  const [menuMinWidth, setMenuMinWidth] = React.useState<number | null>(null)

  const pressableRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (pressableRef.current !== null) {
      setMenuMinWidth(pressableRef.current.offsetWidth)
    }
  }, [pressableRef])

  const listBoxStyle: Style = {
    '--select-min-width': menuMinWidth !== null
      ? `${menuMinWidth}px`
      : 'var(--size-200, 12rem)'
  }

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

      <div ref={pressableRef}>
        <Pressable className='select__input'>
          {renderValue(items, selectedKey, placeholder, isDisabled)}

          <Chevron isRotated={isSelectMenuOpen} />
        </Pressable>
      </div>

      <Popover>
        <Motion animation='fade-in'>
          <ListBox
            className='select__list-box'
            items={items}
            onAction={(key) => handleSelectItem(key, items, onSelect)}
            style={listBoxStyle}
          >
            {item => (
              <ListBoxItem
                className='select__list-box__item'
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
    </ReactAriaSelect>
  )
}
