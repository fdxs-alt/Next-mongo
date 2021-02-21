import { createUser, getUserByEmailOrNick, getUserByNick, User } from '@db'
import { ErrorWithCode, IRequest } from '@middleware'
import { compare } from 'bcrypt'
import { WithId } from 'mongodb'
import { NextApiResponse } from 'next'

class AuthController {
  static me(req: IRequest, res: NextApiResponse) {
    const user = req.session.get('user')

    res.status(200).json({ ...user })
  }
  static logout(req: IRequest, res: NextApiResponse) {
    req.session.destroy()
    res.status(201).json({ success: true })
  }

  static async login(req: IRequest, res: NextApiResponse) {
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

    req.session.set('user', { ...rest })

    await req.session.save()

    res.status(201).json({
      user: { ...rest },
    })
  }

  static async register(req: IRequest, res: NextApiResponse) {
    const { nick, password, email } = req.body

    const { db } = req

    if (!nick || !password || !email) {
      throw new ErrorWithCode({ message: 'Fill up all fields', code: 400 })
    }

    const users = await getUserByEmailOrNick(db, nick, email)

    if (users.length > 0) {
      throw new ErrorWithCode({
        message: 'User with such credentials already exists',
        code: 400,
      })
    }

    const { insertedId } = await createUser(db, { email, password, nick })

    const newUser = { email, _id: insertedId, nick, role: 'USER' }

    req.session.set('user', { ...newUser })

    await req.session.save()

    res.status(200).json({
      user: { ...newUser },
    })
  }
}

export default AuthController
