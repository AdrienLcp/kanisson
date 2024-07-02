type Param = Record<string, string | string[]> | null

type Params <T extends Param> = T

export type PageParams <T extends Param> = {
  params: Params<T>
}

export type PageProps <T extends Param = null> = Readonly<PageParams<T>>
export type LayoutProps <T extends Param = null> = PageProps<T> & React.PropsWithChildren
