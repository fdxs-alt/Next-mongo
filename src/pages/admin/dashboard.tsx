import { Box } from '@chakra-ui/layout'
import { Layout } from '@components'
import React from 'react'

const Dashboard = () => {
  return (
    <Layout title="Admin | Dashboard" isAdmin>
      <Box>Dashboard</Box>
    </Layout>
  )
}

export default Dashboard

export async function getServerSideProps() {
  return { props: {} }
}
