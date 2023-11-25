import { AuthButton, LocaleSwitcher, ThemeSwitcher } from '@/Components'
import { getAuthSession } from '@/Lib'
import { signIn } from 'next-auth/react'

const Home = async () => {
  const session = await getAuthSession()
  console.log(session)
  return (
    <>
      HOME
      <AuthButton isAuth={!!session} />
      <LocaleSwitcher />
      <ThemeSwitcher />
    </>
  )
}

export default Home
