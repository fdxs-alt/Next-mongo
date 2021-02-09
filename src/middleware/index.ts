import { withSession } from 'middleware/auth'
import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { Session } from 'next-iron-session'

import database from './db'
import errorHandler, { ErrorWithCode } from './error'

export interface IRequest extends NextApiRequest {
  db: Db
  session: Session
}

const middleware = nc<IRequest, NextApiResponse>({ onError: errorHandler })

middleware.use(database)

export default middleware

export { ErrorWithCode, withSession }
