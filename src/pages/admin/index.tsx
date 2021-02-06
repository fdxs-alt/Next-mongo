import { LoginForm } from '@components'
import { useAuthCtx } from '@ctx'
import React from 'react'

interface Props {}

const AdminHome: React.FC<Props> = (): JSX.Element => {
  const { login } = useAuthCtx()
  return (
    <LoginForm
      title="Admin panel"
      isAdmin={true}
      heading="Admin panel"
      handleSubmit={login}
    />
  )
}

export default AdminHome
