import { About, AuthorBooks, Layout } from '@components'
import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { AuthorWithID } from '@db'
const SingleAuthor: React.FC = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const { data: author, error } = useSWR<AuthorWithID>(
    `/api/parser/admin/author/${id}`
  )
  const { data: book } = useSWR(`/api/parser/admin/book/author/${id}`)

  return (
    <Layout title="Author" isAdmin>
      <About author={author} />
      <AuthorBooks />
    </Layout>
  )
}

export default SingleAuthor
