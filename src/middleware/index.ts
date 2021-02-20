import { authMiddleware, adminAuthMiddleware } from './auth'
import { withSession, session } from 'middleware/auth'
import { Db } from 'mongodb'
import { NextApiRequest } from 'next'
import { Session } from 'next-iron-session'
import database from './db'
import errorHandler, { ErrorWithCode } from './error'

export interface IRequest extends NextApiRequest {
  db: Db
  session: Session
}

export {
  ErrorWithCode,
  withSession,
  session,
  adminAuthMiddleware,
  authMiddleware,
  database,
  errorHandler,
}
