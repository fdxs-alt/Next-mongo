import { Db, WithId, ObjectID } from 'mongodb'
import { hash } from 'bcrypt'

export interface User {
  email: string
  password?: string
  nick: string
  role?: 'USER' | 'ADMIN'
}

const createUser = async (database: Db, { email, password, nick }: User) => {
  const userCollection = database.collection<User>('users')

  const hashedPassword = await hash(password, 10)

  const newUser = await userCollection.insertOne({
    email,
    nick,
    password: hashedPassword,
    role: 'USER',
  })

  return newUser
}

const getUserById = async (database: Db, id: ObjectID) => {
  const userCollection = database.collection<User>('users')

  const { password, ...rest } = await userCollection.findOne({
    _id: new ObjectID(id),
  })

  return { ...rest } as WithId<User>
}

const removeUser = async (database: Db, id: ObjectID) => {
  const userCollection = database.collection<User>('users')

  const deletedUser = await userCollection.findOneAndDelete({
    _id: id,
  })

  return deletedUser
}

const getUserByNick = async (database: Db, nick: string) => {
  const userCollection = database.collection<User>('users')

  const user = await userCollection.findOne({ nick })

  return user
}

const getUserByEmailOrNick = async (
  database: Db,
  nick: string,
  email: string
) => {
  const userCollection = database.collection<User>('users')

  const users = await userCollection
    .find({ $or: [{ email }, { nick }] })
    .toArray()

  return users
}

export {
  createUser,
  getUserById,
  removeUser,
  getUserByNick,
  getUserByEmailOrNick,
}
