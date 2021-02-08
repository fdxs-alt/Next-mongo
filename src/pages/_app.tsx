import type { AppContext, AppProps } from 'next/app'
import { AuthContextProvider, getAccessToken, setAccessToken } from '@ctx'
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

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const token = getAccessToken()
  //console.log('TOKEN', token)
  if (!token) {
    const { data } = await post<unknown, { accessToken: string }>(
      '/api/auth/refresh'
    )
    //console.log('TOKEN FROM FETCH', data.accessToken)
    setAccessToken(data.accessToken)
  }

  //console.log(getAccessToken())

  return { ...appProps }
}
