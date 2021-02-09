import { WithId } from 'mongodb'
import { getUserByNick, User } from '@db'
import middleware, { ErrorWithCode, withSession } from '@middleware'
import { compare } from 'bcrypt'

const handler = middleware.post(async (req, res, next) => {
  const { nick, password } = req.body
  const { db } = req

  if (!nick || !password) {
    return next(new ErrorWithCode({ message: 'Fill up all fields', code: 400 }))
  }

  const user = await getUserByNick(db, nick)

  if (!user) {
    return next(new ErrorWithCode({ message: 'User unauthorized', code: 400 }))
  }

  const isAuth = await compare(password, user.password)

  if (!isAuth) {
    return next(new ErrorWithCode({ message: 'User unauthorized', code: 401 }))
  }

  const { password: _, ...rest } = user as WithId<User>

  req.session.set('user', { ...rest })

  await req.session.save()

  return res.json({
    user: { ...rest },
  })
})

export default withSession(handler)
