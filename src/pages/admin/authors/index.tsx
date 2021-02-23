import { Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { AuthorData, AuthorForm, Layout, Modal } from '@components'
import { User } from '@ctx'
import { withSession } from '@middleware'
import { redirect } from '@utils'
import React, { useState } from 'react'
import useSWR from 'swr'
import { getServerSidePropsWithSession } from 'types'

const Authors = () => {
  const [page, setPage] = useState(0)
  const { data } = useSWR(`/api/admin/authors/${page}`)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Layout title="Admin | Authors" isAdmin>
      <Flex w="100%" direction="column" p={5}>
        <Heading alignSelf="center" margin="0.4em 0">
          Authors panel
        </Heading>
        <Button onClick={onOpen} width="fit-content">
          Create new author
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title="Create new author"
          cta="Create"
        >
          <AuthorForm />
        </Modal>
        <AuthorData />
      </Flex>
    </Layout>
  )
}

export default Authors

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
