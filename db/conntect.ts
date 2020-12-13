import { MongoClient, Db } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;

declare global {
  namespace NodeJS {
    interface Global {
      mongo: any;
    }
  }
}

global.mongo = global.mongo || {};

export async function connectToDatabase() {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
    });

    await global.mongo.client.connect();
  }

  const db: Db = global.mongo.client.db(MONGODB_DB);

  return { db, dbClient: global.mongo.client };
}
