import { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'

export const sendRefreshCookie = (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string
) => {
  const cookies = new Cookies(req, res)
  cookies.set('jrc', token, { httpOnly: true, overwrite: true, signed: false })
}

export const destroyRefreshCookie = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const cookies = new Cookies(req, res)
  cookies.set('jrc')
}
