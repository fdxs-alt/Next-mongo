import { post } from '@api'
import { useToast } from '@chakra-ui/toast'
import { getAccessToken, setAccessToken } from '@ctx'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { setConfig } from './AccessToken'

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
}

const AuthCtx = createContext<CtxProps>({} as CtxProps)

const AuthCtxProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const toast = useToast()

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

  const login = useCallback(
    async (values: LoginValues) => {
      try {
        const {
          data: { accessToken, ...rest },
        } = await post<LoginValues, User & { accessToken: string }>(
          '/api/auth/login',
          values
        )
        setUser(rest)
        setAccessToken(accessToken)
      } catch (error) {
        createErrorToast(error.response.data.message)
      }
    },
    [createErrorToast]
  )

  const register = useCallback(
    async (values: RegisterValues) => {
      try {
        const {
          data: { accessToken, ...rest },
        } = await post<RegisterValues, User & { accessToken: string }>(
          '/api/auth/register',
          values
        )
        setUser(rest)
        setAccessToken(accessToken)
      } catch (error) {
        createErrorToast(error.response.data.message)
      }
    },
    [createErrorToast]
  )

  const logout = useCallback(async () => {
    try {
      await post('/api/auth/logout', null)
      setUser(null)
      setAccessToken(null)
    } catch (error) {
      createErrorToast(error.response.data.message)
    }
  }, [createErrorToast])

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await post<null, { user: User }>(
        '/api/auth/user',
        null,
        setConfig()
      )
      console.log('data', data)
      const { user: USER } = data
      setUser(USER)
    }
    fetchUser()
    const id = setInterval(() => {
      fetchUser()
    }, 1000 * 60 * 15)
    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <AuthCtx.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export default AuthCtxProvider

const useAuthCtx = () => {
  return useContext(AuthCtx)
}

export { useAuthCtx }
