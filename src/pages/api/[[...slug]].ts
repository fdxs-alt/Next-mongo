import { errorHandler, session, database } from '@middleware'
import nc from 'next-connect'
import AuthController from '../../routes/Auth'

const handler = nc({ onError: errorHandler, attachParams: true })
  .use(database)
  .use(session)
  .get('/api/auth/me', AuthController.me)
  .post('/api/auth/login', AuthController.login)
  .post('/api/auth/register', AuthController.register)
  .post('/api/auth/logout', AuthController.logout)

export default handler
