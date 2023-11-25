import { AuthButton, Input, LocaleSwitcher, ThemeSwitcher } from '@/Components'
import { getAuthSession } from '@/Lib'

const Home = async () => {
  const session = await getAuthSession()

  return (
    <>
      HOME
    </>
  )
}

export default Home
