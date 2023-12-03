import { getAuthSession } from '@/Lib'
import { getAllUsers } from '@/Actions'
import { CopyButton } from '@/Components'

const Home = async () => {
  const session = await getAuthSession()

  const users = await getAllUsers()

  return (
    <>
      <CopyButton string='test' />
    </>
  )
}

export default Home
