import type { PageProps } from '@/Types'

import { getDictionary } from '@/Locales'
import { PageWrapper } from '@/Layouts'


const SearchPage: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.search

  return ( 
    <PageWrapper
      title={strings.title}
      description=''
    >

    </PageWrapper>
  )
}

export default SearchPage
