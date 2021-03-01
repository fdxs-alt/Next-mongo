import { About, AuthorBooks, Layout } from '@components'
import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { AuthorWithID } from '@db'
import { patch } from '@api'
import { IAuthorForm } from 'components/admin/author'
const SingleAuthor: React.FC = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const { data, mutate } = useSWR<{ author: AuthorWithID }>(
    id ? `/api/parser/admin/author/${id}` : null
  )

  // const { data: book } = useSWR(`/api/parser/admin/book/author/${id}`)

  const handleUpdate = useCallback(
    async (values: IAuthorForm) => {
      try {
        await patch(`/api/parser/admin/author/${id}`, values)
        mutate({ ...data, ...values })
      } catch (error) {
        console.log(error)
      }
    },
    [data, id, mutate]
  )

  return (
    <Layout title="Author" isAdmin>
      {data && <About author={data.author} handleUpdate={handleUpdate} />}
      <AuthorBooks />
    </Layout>
  )
}

export default SingleAuthor
