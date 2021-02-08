import { ACCESS_TYPE } from '@utils'
import { decodeJwtToken, getUserById } from '@db'
import { IRequest } from '@middleware'
import { ObjectID } from 'mongodb'
const authMiddleware = async (req: IRequest, res, next) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return next()
  }

  try {
    const token = authorization.split(' ')[1]
    const decodedToken = (await decodeJwtToken(token, ACCESS_TYPE)) as {
      exp: number
      iat: number
      id: ObjectID
    }

    if (decodedToken) {
      const { id } = decodedToken
      const { password: _, ...rest } = await getUserById(req.db, id)
      req.user = rest
      return next()
    }
  } catch (error) {
    return next()
  }
}

export default authMiddleware
