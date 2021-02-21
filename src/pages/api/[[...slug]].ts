import { errorHandler, session, database, asyncHandler } from '@middleware'
import nc from 'next-connect'
import AuthController from '../../routes/Auth'

const handler = nc({ onError: errorHandler, attachParams: true })
  .use(database)
  .use(session)
  .get('/api/auth/me', asyncHandler(AuthController.me))
  .post('/api/auth/login', asyncHandler(AuthController.login))
  .post('/api/auth/register', asyncHandler(AuthController.register))
  .post('/api/auth/logout', asyncHandler(AuthController.logout))

export default handler
