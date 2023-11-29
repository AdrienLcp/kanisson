import { useSession } from 'next-auth/react'

import type { Session } from '@/Types'
import { Button, PersonaMenu } from '@/Components'
import { useLocale } from '@/Hooks'
import { login } from '@/Lib'

import styles from './header.styles.module.sass'

const Header: React.FC = () => {
  const { strings } = useLocale()
  const session = useSession()

  const handleLogin = async () => await login()

  const renderAuthContent = (session: Session) => {
    if (session.status === 'loading') {
      return null
    }

    if (session.data) {
      return <PersonaMenu user={session.data.user} />
    }

    return (
      <Button onClick={handleLogin}>
        {strings.app.actions.login}
      </Button>
    )
  }

  return (
    <header className={styles['header']}>
      <h1 className={styles['header__title']}>
        {strings.app.title}
      </h1>

      {renderAuthContent(session)}
    </header>
  )
}

export default Header
