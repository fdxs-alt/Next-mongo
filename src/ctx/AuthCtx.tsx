import { post } from '@api'
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/router'
import React, { createContext, useCallback, useContext } from 'react'
import useSWR from 'swr'

export interface User {
  nick: string
  email: string
  _id: string
  role: 'ADMIN' | 'USER'
}
interface LoginValues {
  nick: string
  password: string
}

interface RegisterValues extends LoginValues {
  nick: string
  password: string
}

interface Props {
  children: React.ReactNode
}

interface CtxProps {
  user: User
  login: (args: LoginValues) => Promise<void>
  register: (args: RegisterValues) => Promise<void>
  logout: () => Promise<void>
  push: (url: string) => void
}

const AuthCtx = createContext<CtxProps>({} as CtxProps)

const AuthCtxProvider: React.FC<Props> = ({ children }) => {
  const { data: user, mutate } = useSWR<User | null>('/api/parser/auth/me')
  const toast = useToast()
  const { push: pushState } = useRouter()

  const createErrorToast = useCallback(
    (description: string) => {
      return toast({
        title: 'Error',
        description,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
    [toast]
  )

  const push = useCallback((url: string) => pushState(url), [pushState])

  const login = useCallback(
    async (values: LoginValues) => {
      try {
        const {
          data: { user },
        } = await post<LoginValues, { user: User }>(
          '/api/parser/auth/login',
          values
        )
        mutate({ ...user })
      } catch (error) {
        createErrorToast(error.response.data.message)
      }
    },
    [createErrorToast, mutate]
  )

  const register = useCallback(
    async (values: RegisterValues) => {
      try {
        const {
          data: { user },
        } = await post<RegisterValues, { user: User }>(
          '/api/parser/auth/register',
          values
        )
        mutate({ ...user })
      } catch (error) {
        createErrorToast(error.response.data.message)
      }
    },
    [createErrorToast, mutate]
  )

  const logout = useCallback(async () => {
    try {
      await post('/api/parser/auth/logout', null)
      mutate(null)
    } catch (error) {
      createErrorToast(error.response.data.message)
    }
  }, [createErrorToast, mutate])

  return (
    <AuthCtx.Provider value={{ user, login, register, logout, push }}>
      {children}
    </AuthCtx.Provider>
  )
}

export default AuthCtxProvider

const useAuthCtx = () => {
  return useContext(AuthCtx)
}

export { useAuthCtx }
