import type { AppProps } from 'next/app'
import { AuthContextProvider, User } from '@ctx'
import { ChakraProvider } from '@chakra-ui/react'
import App from 'next/app'
import { post } from '@api'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
