import { getAuthSession } from '@/Lib'
import { getAllUsers } from '@/Actions'

const Home = async () => {
  const session = await getAuthSession()

  const users = await getAllUsers()

  return (
    <>
    
    </>
  )
}

export default Home
