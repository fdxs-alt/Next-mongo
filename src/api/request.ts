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

const get = <K>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<K>> => {
  return Axios.get(url, config)
}

const del = <K>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<K>> => {
  return Axios.delete(url, config)
}

const fetcher = <T>(url: string) => Axios.get(url).then((res) => res.data as T)

export { fetcher, post, get, del }
