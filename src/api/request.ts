import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const Axios = axios.create({
  baseURL: 'http://localhost:3000',
})

const get = <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return Axios.get(url, config)
}

const post = <T, K>(
  url: string,
  body?: T,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<K>> => {
  return Axios.post(url, body, config)
}

export { get, post }
