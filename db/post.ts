import { Db } from "mongodb";
import { nanoid } from "nanoid";

interface ICreatePost {
  title: string;
  content: string;
  author: string;
}

interface IPost extends ICreatePost {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export const createPost = (db: Db, data: ICreatePost) => {
  return db.collection<IPost>("posts").insertOne({
    _id: nanoid(),
    date: new Date().toLocaleDateString(),
    ...data,
  });
};

export const getSinglePost = (db: Db, _id: string) => {
  return db.collection<IPost>("posts").findOne({ _id });
};

export const getUserPosts = (db: Db, userId: string) => {
  return db.collection<IPost>("posts").find({ author: userId }).toArray();
};

export const getAllPosts = (db: Db, skip: number) => {
  return db.collection<IPost>("posts").find().limit(20).skip(skip).toArray();
};

export const deletePost = (db: Db, _id: string) => {
  return db.collection<IPost>("posts").deleteOne({ _id });
};

export const deleteAllPosts = (db: Db, userId: string) => {
  return db.collection<IPost>("posts").deleteMany({ author: userId });
};
