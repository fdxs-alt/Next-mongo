import { Db } from "mongodb";

interface Book {
  authorId: string;
  title: string;
  publishDate: Date;
  publishPlace: string;
  extraInfo?: string;
  description: string;
  count: number;
  genre: string;
  borrowed: number;
  timeAdded: Date;
}

const createBook = async (db: Db) => {};
const getRecentBooks = async (db: Db) => {};
const getSearchedBooks = async (db: Db) => {};
const getBookById = async (db: Db) => {};
const getBooksByAuthorId = async (db: Db) => {};
const deleteBook = async (db: Db) => {};
const updateBook = async (db: Db) => {};
const updateBorrowedCount = async (db: Db) => {};

export {
  createBook,
  deleteBook,
  updateBook,
  updateBorrowedCount,
  getRecentBooks,
  getSearchedBooks,
  getBookById,
  getBooksByAuthorId,
};
