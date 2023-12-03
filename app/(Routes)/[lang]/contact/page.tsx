import type { PageProps } from '@/Types'
import { getDictionary } from '@/Locales'
import { ContactForm } from '@/Components'

import styles from './contact.styles.module.sass'

const FORM_SPREE_ID = process.env.FORM_SPREE_KEY || ''

const Contact: React.FC<PageProps> = async ({ params }) => {
  const dictionary = await getDictionary(params.lang)
  const strings = dictionary.pages.contact

  return (
    <div className={styles['contact-wrapper']}>
      <div className={styles['contact-container']}>
        <h2 className={styles['contact-title']}>
          {strings.title}
        </h2>

        <p className={styles['contact-description']}>
          {strings.description}
        </p>

        <ContactForm formSpreeId={FORM_SPREE_ID} />
      </div>
    </div>
  )
}

export default Contact
