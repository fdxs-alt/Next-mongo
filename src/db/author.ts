import { Db } from "mongodb";

interface Author {
  name: string;
  surname: string;
  dateOfBirth: Date;
  dateOfDeath?: Date;
  description: string;
  books: [
    {
      id: string;
      title: string;
      genre: string;
    }
  ];
}

const createAuthor = async (db: Db) => {};
const deleteAuthor = async (db: Db) => {};
const addBookToAuthor = async (db: Db) => {};
const removeBookFromAuthor = async (db: Db) => {};
const updateAuthorData = async (db: Db) => {};
const getAuthorById = async (db: Db) => {};
const getAuthors = async (db: Db) => {};

export {
  createAuthor,
  deleteAuthor,
  addBookToAuthor,
  removeBookFromAuthor,
  updateAuthorData,
  getAuthorById,
  getAuthors,
};
