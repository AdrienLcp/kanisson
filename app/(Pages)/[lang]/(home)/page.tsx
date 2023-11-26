import { AuthButton, HueSwitcher, Input, LocaleSwitcher, ThemeSwitcher } from '@/Components'
import { getAuthSession } from '@/Lib'

const Home = async () => {
  const session = await getAuthSession()

  return (
    <>
      HOME
      <AuthButton isAuth={!!session} />

      <LocaleSwitcher />
      <ThemeSwitcher />
      <HueSwitcher />
    </>
  )
}

export default Home
