import { User } from '@db'
import { IRequest } from '@middleware'
let user: User | null = null

export const getUser = (req: IRequest) => {
  if (!user) {
    user = req.session.get<User>('user')
  }

  return user
}
