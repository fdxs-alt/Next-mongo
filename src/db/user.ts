import { ACCESS_TYPE } from "@utils";
import { REFRESH_TYPE } from "@utils";
import { Db, WithId, ObjectID } from "mongodb";
import { hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
export interface User {
  email: string;
  password?: string;
  nick: string;
  role?: "USER" | "ADMIN";
}

export interface JwtPayload {
  role?: "USER" | "ADMIN";
  email: string;
  nick: string;
  _id: ObjectID;
}

export interface JwtData extends JwtPayload {
  iat: number;
  exp: number;
}

const createUser = async (database: Db, { email, password, nick }: User) => {
  const userCollection = database.collection<User>("users");

  const hashedPassword = await hash(password, 10);

  const newUser = await userCollection.insertOne({
    email,
    nick,
    password: hashedPassword,
    role: "USER",
  });

  return newUser;
};

const getUserById = async (database: Db, id: ObjectID) => {
  const userCollection = database.collection<User>("users");

  const { password, ...rest } = await userCollection.findOne({
    _id: new ObjectID(id),
  });

  return { ...rest } as WithId<User>;
};

const removeUser = async (database: Db, id: ObjectID) => {
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

const createJwtToken = (
  payload: JwtPayload,
  type: typeof REFRESH_TYPE | typeof ACCESS_TYPE
) => {
  switch (type) {
    case REFRESH_TYPE:
      return sign({ id: payload._id }, process.env.SECRET, {
        expiresIn: "7d",
      });
    case ACCESS_TYPE:
      return sign({ id: payload._id }, process.env.SECRET_TWO, {
        expiresIn: "15m",
      });
    default:
      throw new Error("Add the type");
  }
};

const decodeJwtToken = async (
  token: string,
  type: typeof REFRESH_TYPE | typeof ACCESS_TYPE
) => {
  try {
    switch (type) {
      case REFRESH_TYPE:
        return verify(token, process.env.SECRET);
      case ACCESS_TYPE:
        return verify(token, process.env.SECRET_TWO);
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
};

export {
  createUser,
  getUserById,
  removeUser,
  getUserByNick,
  getUserByEmailOrNick,
  decodeJwtToken,
  createJwtToken,
};
