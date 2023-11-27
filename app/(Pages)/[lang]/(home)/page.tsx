
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
