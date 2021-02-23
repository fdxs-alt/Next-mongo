import { getUser } from './session'
import { ErrorWithCode, IRequest } from '@middleware'
import { NextApiResponse } from 'next'
import { withIronSession, ironSession } from 'next-iron-session'

export const withSession = (handler) => {
  return withIronSession(handler, {
    password: process.env.SECRET,
    cookieName: 'session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  })
}

export const session = ironSession({
  password: process.env.SECRET,
  cookieName: 'session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
})

export const common = (req: IRequest, res: NextApiResponse, next) => {
  const user = getUser(req)

  req.user = user

  next()
}

export const authMiddleware = (req: IRequest, res: NextApiResponse, next) => {
  try {
    const user = req.session.get('user')

    if (!user) {
      throw new ErrorWithCode({ message: 'User unauthorized', code: 401 })
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const adminAuthMiddleware = (
  req: IRequest,
  res: NextApiResponse,
  next
) => {
  try {
    const user = req.session.get('user')
    if (!user || user.role !== 'ADMIN') {
      throw new ErrorWithCode({ message: 'User unauthorized', code: 401 })
    }
    next()
  } catch (error) {
    next(error)
  }
}
