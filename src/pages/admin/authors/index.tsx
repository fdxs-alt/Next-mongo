import { post, del } from '@api'
import { Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { AuthorData, AuthorForm, Layout, Modal } from '@components'
import { User } from '@ctx'
import { AuthorData as AuthorDataType } from '@db'
import { withSession } from '@middleware'
import { redirect } from '@utils'
import { WithId } from 'mongodb'
import React, { useCallback, useState } from 'react'
import useSWR from 'swr'
import { getServerSidePropsWithSession } from 'types'

const Authors = () => {
  const [page, setPage] = useState(0)
  const { data, mutate } = useSWR<{ authors: WithId<AuthorDataType>[] }>(
    `/api/admin/authors/${page}`
  )
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmit = useCallback(
    async (newAuthor: AuthorDataType) => {
      try {
        const { data: author } = await post<
          AuthorDataType,
          { author: WithId<AuthorDataType> }
        >('/api/admin/author/create', {
          ...newAuthor,
        })
        const newData = [...data.authors, author.author]
        mutate({ ...data, authors: newData })
      } catch (error) {
        console.log(error)
      }
    },
    [mutate, data]
  )

  const deleteAuthor = useCallback(
    async (id: string) => {
      try {
        await del(`/api/admin/author/${id}`)
        const newData = data.authors.filter(
          (el) => ((el._id as unknown) as string) !== id
        )

        mutate({ ...data, authors: newData })
      } catch (error) {
        console.log(error)
      }
    },
    [mutate, data]
  )

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
        {data && <AuthorData data={data.authors} deleteAuth={deleteAuthor} />}
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
