import axios from 'axios'

const Axios = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

const fetcher = <T>(url: string) => Axios.get(url).then((res) => res.data as T)

export { fetcher }
