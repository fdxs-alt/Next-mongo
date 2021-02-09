import middleware, { ErrorWithCode, withSession } from '@middleware'
import { createUser, getUserByEmailOrNick } from '@db'

const handler = middleware.post(async (req, res, next) => {
  const { nick, password, email } = req.body

  const { db } = req

  if (!nick || !password || !email) {
    return next(new ErrorWithCode({ message: 'Fill up all fields', code: 400 }))
  }

  const users = await getUserByEmailOrNick(db, nick, email)

  if (users.length > 0) {
    return next(
      new ErrorWithCode({
        message: 'User with such credentials already exists',
        code: 400,
      })
    )
  }

  const { insertedId } = await createUser(db, { email, password, nick })

  const newUser = { email, _id: insertedId, nick, role: 'USER' }

  req.session.set('user', { ...newUser })

  await req.session.save()

  return res.json({
    user: { ...newUser },
  })
})

export default withSession(handler)
