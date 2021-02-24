import { post } from '@api'
import { Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { AuthorData, AuthorForm, Layout, Modal } from '@components'
import { User } from '@ctx'
import { AuthorData as AuthorDataType } from '@db'
import { withSession } from '@middleware'
import { redirect } from '@utils'
import React, { useCallback, useState } from 'react'
import useSWR from 'swr'
import { getServerSidePropsWithSession } from 'types'

const Authors = () => {
  const [page, setPage] = useState(0)
  const { data, mutate } = useSWR(`/api/admin/authors/${page}`)
  const { isOpen, onOpen, onClose } = useDisclosure()
  console.log(data)
  const handleSubmit = useCallback(async (newAuthor: AuthorDataType) => {
    const { data: author } = await post('/api/admin/author/create', {
      ...newAuthor,
    })
    mutate({ ...data, author })
  }, [])

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
          <AuthorForm handleSubmit={handleSubmit} />
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
