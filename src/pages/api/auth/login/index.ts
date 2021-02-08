import { WithId } from 'mongodb'
import { getUserByNick, createJwtToken, User } from '@db'
import middleware, { ErrorWithCode } from '@middleware'
import { ACCESS_TYPE, REFRESH_TYPE, sendRefreshCookie } from '@utils'
import { compare } from 'bcrypt'

const handler = middleware.post(async (req, res, next) => {
  const { nick, password } = req.body
  const { db } = req

  if (!nick || !password) {
    throw new ErrorWithCode({ message: 'Fill up all fields', code: 400 })
  }

  const user = await getUserByNick(db, nick)

  if (!user) {
    throw new ErrorWithCode({ message: 'User unauthorized', code: 400 })
  }

  const isAuth = await compare(password, user.password)

  if (!isAuth) {
    throw new ErrorWithCode({ message: 'User unauthorized', code: 401 })
  }

  const { password: _, ...rest } = user as WithId<User>

  const refreshToken = createJwtToken(rest, REFRESH_TYPE)

  sendRefreshCookie(req, res, refreshToken)

  return res.json({
    ...rest,
    accessToken: createJwtToken(rest, ACCESS_TYPE),
  })
})

export default handler
