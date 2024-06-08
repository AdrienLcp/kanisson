import type { ButtonRenderProps, ListBoxRenderProps, PopoverRenderProps } from 'react-aria-components'

export type ResponsiveSize = `${number}rem`

export type ClassNames = Array<string | undefined | null | false>

export const classNames = (...classes: ClassNames): string => {
  return classes.filter(Boolean).join(' ')
}

type ElementRenderProps =
  ButtonRenderProps |
  ListBoxRenderProps |
  PopoverRenderProps

type RenderPropsValues <T extends ElementRenderProps> = T & {
  defaultClassName: string | undefined
}

export const getReactAriaClassName = <T extends ElementRenderProps> (
  values: RenderPropsValues<T>,
  className: string | ((values: RenderPropsValues<T>) => string) | undefined,
  ...baseClassName: ClassNames
) => {
  const classNameOverride = typeof className === 'function'
    ? className(values)
    : className

  return classNames(...baseClassName, classNameOverride)
}
