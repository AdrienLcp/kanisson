import styles from './page-wrapper.styles.module.sass'

type PageWrapperProps = React.PropsWithChildren<{
  title?: string
  description?: string
}>

const PageWrapper: React.FC<PageWrapperProps> = ({ title, description, children }) => (
  <div className={styles['page__wrapper']}>
    <div className={styles['page__container']}>
      <header>
        <h1 className={styles['page__title']}>
          {title}
        </h1>

        <p className={styles['page__description']}>
          {description}
        </p>          
      </header>

      <div className={styles['page__content']}>
        {children}
      </div>
    </div>
  </div>
)

export default PageWrapper
