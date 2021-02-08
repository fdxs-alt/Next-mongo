import middleware, { ErrorWithCode } from '@middleware'
import {
  createJwtToken,
  createUser,
  getUserByEmailOrNick,
  JwtPayload,
} from '@db'
import { ACCESS_TYPE, REFRESH_TYPE, sendRefreshCookie } from '@utils'

const handler = middleware.post(async (req, res, next) => {
  const { nick, password, email } = req.body

  const { db } = req

  if (!nick || !password || !email) {
    throw new ErrorWithCode({ message: 'Fill up all fields', code: 400 })
  }

  const users = await getUserByEmailOrNick(db, nick, email)

  if (users.length > 0) {
    return new ErrorWithCode({
      message: 'User with such credentials already exists',
      code: 400,
    })
  }

  const { insertedId } = await createUser(db, { email, password, nick })

  const newUser = { email, _id: insertedId, nick, role: 'USER' } as JwtPayload

  const refreshToken = createJwtToken(newUser, REFRESH_TYPE)

  sendRefreshCookie(req, res, refreshToken)

  return res.json({
    ...newUser,
    accessToken: createJwtToken(newUser, ACCESS_TYPE),
  })
})

export default handler
