import type { PageProps } from '@/Types'
import { getDictionary } from '@/Locales'
import { PageWrapper } from '@/Layouts'

import ContactForm from './components/contact-form/contact-form'

const FORM_SPREE_ID = process.env.FORM_SPREE_KEY || ''

const ContactPage: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.contact

  return (
    <PageWrapper
      title={strings.title}
      description={strings.description}
    >
      <ContactForm formSpreeId={FORM_SPREE_ID} />
    </PageWrapper>
  )
}

export default ContactPage
