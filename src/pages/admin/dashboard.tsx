import { Box } from '@chakra-ui/layout'
import { Layout } from '@components'
import { User } from '@ctx'
import { withSession } from '@middleware'
import { redirect } from '@utils'
import React from 'react'
import { getServerSidePropsWithSession } from 'types'

const Dashboard = () => {
  return (
    <Layout title="Admin | Dashboard" isAdmin>
      <Box>Dashboard</Box>
    </Layout>
  )
}

export default Dashboard

export const getServerSideProps = withSession(
  async ({ req }: getServerSidePropsWithSession) => {
    const user = req.session.get<User>('user')

    if (!user || user.role !== 'ADMIN') {
      return redirect('/admin')
    }

    return {
      props: { user },
    }
  }
)
