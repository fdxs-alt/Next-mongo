import { connectToDatabase } from "../db/conntect";

export default async function database(req, res, next) {
  const { db, dbClient } = await connectToDatabase();
  req.db = db;
  req.dbClient = dbClient;

  next();
}
