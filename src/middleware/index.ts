import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import database from "./db";
import errorHandler from "./error";

export interface IRequest extends NextApiRequest {
  db: Db;
}

const middleware = nc<IRequest, NextApiResponse>({ onError: errorHandler });

middleware.use(database);

export default middleware;
