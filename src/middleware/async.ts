import { NextHandler } from 'next-connect'
import { IRequest } from '@middleware'
import { NextApiResponse } from 'next'

const asyncHandler = (fn: CallableFunction) => (
  req: IRequest,
  res: NextApiResponse,
  next: NextHandler
) => Promise.resolve(fn(req, res, next)).catch(next)

export { asyncHandler }
