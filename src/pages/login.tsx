import { LoginForm } from '@components'
import { useAuthCtx } from '@ctx'
import React from 'react'

interface Props {}

const Login: React.FC<Props> = (): JSX.Element => {
  const { login } = useAuthCtx()
  return (
    <LoginForm
      title="Login"
      isAdmin={false}
      heading="Login"
      handleSubmit={login}
    />
  )
}

export default Login
