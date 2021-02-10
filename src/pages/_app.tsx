import type { AppProps } from 'next/app'
import { AuthContextProvider } from '@ctx'
import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'
import { fetcher } from '@api'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SWRConfig value={{ fetcher }}>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </SWRConfig>
    </ChakraProvider>
  )
}

export default MyApp
