import { fetcher } from '@api'
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/router'
import React, { createContext, useCallback, useContext, useState } from 'react'

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
  const [user, setUser] = useState<User | null>({} as User)
  const toast = useToast()
  const router = useRouter()

  const createErrorToast = useCallback((description: string) => {
    return toast({
      title: 'Error',
      description,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }, [])

  const push = useCallback((url: string) => router.push(url), [router])

  const login = useCallback(async (values: LoginValues) => {}, [])

  const register = useCallback(async (values: RegisterValues) => {}, [])

  const logout = useCallback(async () => {}, [])

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
