'use client'

import { Search } from 'lucide-react'

import { Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger, TracksList, TracksSearch } from '@/Components'
import { AudioLines } from '@/Icons'
import { useLocale } from '@/Hooks'

import styles from './tracks-form.styles.module.sass'

const TracksForm: React.FC = () => {
  const { dictionary } = useLocale()
  const strings = dictionary.components.tracksForm

  return (
    <Tabs defaultValue='tracks'>
      <TabsList className={styles['tabs__list']}>
        <TabsTrigger className={styles['tabs__list__trigger']} value='tracks'>
          <AudioLines /> {strings.triggers.list}
        </TabsTrigger>

        <TabsTrigger className={styles['tabs__list__trigger']} value='search'>
          <Search /> {strings.triggers.search}
        </TabsTrigger>
      </TabsList>

      <TabsContent value='tracks'>
        <Card>
          <CardContent>
            <TracksList />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='search'>
        <Card>
          <CardContent>
            <TracksSearch />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default TracksForm
