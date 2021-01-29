import { Db } from "mongodb";
import { hash } from "bcrypt";

interface User {
  email: string;
  password: string;
  nick: string;
}

const createUser = async (database: Db, { email, password, nick }: User) => {
  const userCollection = database.collection<User>("users");

  const hashedPassword = await hash(password, 10);

  const newUser = await userCollection.insertOne({
    email,
    nick,
    password: hashedPassword,
  });

  return newUser;
};

const getUserById = async (database: Db, id: string) => {
  const userCollection = database.collection<User>("users");

  const user = await userCollection.findOne({ _id: id });

  return user;
};

const removeUser = async (database: Db, id: string) => {
  const userCollection = database.collection<User>("users");

  const deletedUser = await userCollection.findOneAndDelete({
    _id: id,
  });

  return deletedUser;
};

const getUserByNick = async (database: Db, nick: string) => {
  const userCollection = database.collection<User>("users");

  const user = await userCollection.findOne({ nick });

  return user;
};

const getUserByEmailOrNick = async (
  database: Db,
  nick: string,
  email: string
) => {
  const userCollection = database.collection<User>("users");

  const users = await userCollection
    .find({ $or: [{ email }, { nick }] })
    .toArray();

  return users;
};

export {
  createUser,
  getUserById,
  removeUser,
  getUserByNick,
  getUserByEmailOrNick,
};
