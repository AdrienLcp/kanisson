const DATA_SOURCES = ['Youtube'] as const

export type DataSource = typeof DATA_SOURCES[number]

const DEFAULT_DATA_SOURCE: DataSource = 'Youtube'

export const getValidDataSource = (dataSource: string): DataSource => {
  const maybeDataSource = dataSource as DataSource

  if (DATA_SOURCES.includes(maybeDataSource)) {
    return maybeDataSource
  }

  return DEFAULT_DATA_SOURCE
}
