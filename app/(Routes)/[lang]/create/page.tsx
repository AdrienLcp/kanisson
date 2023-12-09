import type { PageProps } from '@/Types'
import { getDictionary } from '@/Locales'
import { PageWrapper } from '@/Layouts'


const CreatePage: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.create

  return (
    <PageWrapper
      title={strings.title}
      description={strings.description}
    >
      
    </PageWrapper>
  )
}

export default CreatePage
