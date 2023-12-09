import { getAuthSession } from '@/Lib'
import { getAllUsers } from '@/Actions'

const HomePage: React.FC = async () => {
  const session = await getAuthSession()

  const users = await getAllUsers()

  return (
    <>
      HOME
    </>
  )
}

export default HomePage
