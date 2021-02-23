import { User } from '@db'
import { authMiddleware, adminAuthMiddleware, common } from './auth'
import { withSession, session } from 'middleware/auth'
import { Db } from 'mongodb'
import { NextApiRequest } from 'next'
import { Session } from 'next-iron-session'
import database from './db'
import errorHandler, { ErrorWithCode } from './error'
import { asyncHandler } from './async'
export interface IRequest extends NextApiRequest {
  params: {
    [key: string]: string
  }
  db: Db
  session: Session
  user: User
}

export {
  ErrorWithCode,
  withSession,
  session,
  adminAuthMiddleware,
  authMiddleware,
  database,
  errorHandler,
  asyncHandler,
  common,
}
