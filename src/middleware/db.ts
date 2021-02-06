import { connectToDatabase } from '@db'

const database = async (req, res, next) => {
  const { db, dbClient } = await connectToDatabase()
  req.db = db
  req.dbClient = dbClient

  next()
}

export default database
