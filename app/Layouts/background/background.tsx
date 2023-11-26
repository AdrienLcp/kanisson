import styles from './background.styles.module.sass'

const Background: React.FC = () => (
  <ul className={styles['background']}>
    {Array.from({ length: 20 }).map((_, index) => (
      <li key={index} className={styles['background-item']} />
    ))}
  </ul>
)

export default Background
