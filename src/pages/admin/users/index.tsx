import { Layout } from '@components'
import { User } from '@ctx'
import { withSession } from '@middleware'
import { redirect } from '@utils'
import { getServerSidePropsWithSession } from 'types'

const Users = () => {
  return (
    <Layout title="Admin | Users" isAdmin>
      Users
    </Layout>
  )
}

export default Users

export const getServerSideProps = withSession(
  async ({ req }: getServerSidePropsWithSession) => {
    const user = req.session.get<User>('user')

    if (!user || user.role !== 'ADMIN') {
      return redirect('/login')
    }

    return {
      props: { user },
    }
  }
)
