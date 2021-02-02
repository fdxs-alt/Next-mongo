import { User } from "@db";
import { Db, WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import authMiddleware from "./auth";
import database from "./db";
import errorHandler, { ErrorWithCode } from "./error";
export interface IRequest extends NextApiRequest {
  db: Db;
  user?: WithId<User>;
}

const middleware = nc<IRequest, NextApiResponse>({ onError: errorHandler });

middleware.use(database);

export default middleware;

export { ErrorWithCode, authMiddleware };
