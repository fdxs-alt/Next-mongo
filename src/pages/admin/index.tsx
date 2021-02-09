import { LoginForm } from '@components'
import { useAuthCtx } from '@ctx'
import React from 'react'

const AdminHome: React.FC = (): JSX.Element => {
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
