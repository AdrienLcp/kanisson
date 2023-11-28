
import { getAuthSession } from '@/Lib'
import { getAllUsers } from '@/Actions'

const Home = async () => {
  const session = await getAuthSession()

  const users = await getAllUsers()


  return (
    <>
    {users.map(user => (
      <>
        <h1>{user.name}</h1>
        <p>{user.role}</p>
      </>
    ))}
    </>
  )
}

export default Home
