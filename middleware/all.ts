import { Db } from "mongodb";
import { NextApiResponse } from "next";
import nc from "next-connect";
import database from "./db";
import errorMiddleware from "./errors";

export interface IResponse extends NextApiResponse {
  db: Db;
}

const middleware = nc();

middleware.use(database);

export default middleware;
