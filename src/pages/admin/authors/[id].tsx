import { About, AuthorBooks, Layout } from '@components'
import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { AuthorWithID } from '@db'
const SingleAuthor: React.FC = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const { data: author, error } = useSWR<AuthorWithID>(
    `/api/admin/author/${id}`
  )
  const { data: book } = useSWR(`/api/admin/book/author/${id}`)

  return (
    <Layout title="Author" isAdmin>
      <About id={id as string} author={author} />
      <AuthorBooks />
    </Layout>
  )
}

export default SingleAuthor
