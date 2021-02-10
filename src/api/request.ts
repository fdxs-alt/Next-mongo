import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const Axios = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

const post = <T, K>(
  url: string,
  body?: T,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<K>> => {
  return Axios.post(url, body, config)
}

const fetcher = <T>(url: string) => Axios.get(url).then((res) => res.data as T)

export { fetcher, post }
