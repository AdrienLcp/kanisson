import type { LucideIcon } from 'lucide-react'
import React from 'react'
import {
  Tab as ReactAriaTab,
  Tabs as ReactAriaTabs,
  TabList,
  TabPanel,
  type TabsProps as ReactAriaTabsProps
} from 'react-aria-components'

import './tabs.styles.sass'

export type Tab <T extends string> = {
  Content: React.ReactNode
  Icon?: LucideIcon
  id: T
  title?: string
}

type OmittedReactAriaTabsProps = 'defaultSelectedKey'
type BaseTabsProps = Omit<ReactAriaTabsProps, OmittedReactAriaTabsProps>

type TabsProps <T extends string> = BaseTabsProps & {
  ariaLabel: string
  defaultSelectedKey?: T
  tabs: Array<Tab<T>>
}

export function Tabs <T extends string> ({ ariaLabel, tabs, ...props }: TabsProps<T>) {
  return (
    <ReactAriaTabs {...props} className='tabs'>
      <TabList
        aria-label={ariaLabel}
        className='tabs__heading'
      >
        {tabs.map(({ Icon, id, title }) => (
          <ReactAriaTab
            className='tabs__heading__item'
            id={id}
            key={id}
          >
            {Icon && <Icon />}

            {title}
          </ReactAriaTab>
        ))}
      </TabList>

      {tabs.map(({ Content, id }) => (
        <TabPanel
          className='tabs__content'
          id={id}
          key={id}
        >
          {Content}
        </TabPanel>
      ))}
    </ReactAriaTabs>
  )
}
