'use client'

import { Search } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TracksList,
  TracksSearch
} from '@/Components'
import { AudioLines } from '@/Icons'
import { useLocale } from '@/Hooks'

import styles from './tracks-form.styles.module.sass'

type TracksFormProps = {
  youtubeApiKey: string
}

const TracksForm: React.FC<TracksFormProps> = ({ youtubeApiKey }) => {
  const { dictionary } = useLocale()
  const strings = dictionary.components.tracksForm

  return (
    <Tabs defaultValue='tracks'>
      <TabsList className={styles['tabs__list']}>
        <TabsTrigger className={styles['tabs__list__trigger']} value='tracks'>
          <AudioLines /> {strings.list.trigger}
        </TabsTrigger>

        <TabsTrigger className={styles['tabs__list__trigger']} value='search'>
          <Search /> {strings.search.trigger}
        </TabsTrigger>
      </TabsList>

      <TabsContent value='tracks'>
        <Card>
          <CardHeader>
            <CardTitle>
              {strings.list.title}
            </CardTitle>
            <CardDescription>
              {strings.list.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <TracksList />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='search'>
        <Card>
          <CardHeader>
            <CardTitle>
              {strings.search.title}
            </CardTitle>
            <CardDescription>
              {strings.search.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <TracksSearch youtubeApiKey={youtubeApiKey} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default TracksForm
