import { AxiosRequestConfig } from 'axios'

let accessToken = ''

const setAccessToken = (token: string) => {
  accessToken = token
}

const getAccessToken = (token: string) => {
  accessToken = token
}

const setConfig = () => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-type': 'application/json',
    },
  }

  config.headers['Authorization'] = accessToken

  return config
}

export { setAccessToken, getAccessToken, setConfig }
