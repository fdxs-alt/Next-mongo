import { ObjectID } from 'mongodb'
import { Db } from 'mongodb'

interface Book {
  authorId: ObjectID
  title: string
  publishDate: Date
  publishPlace: string
  extraInfo?: string
  description: string
  count: number
  genre: string
  borrowed: number
  timeAdded: Date
}

const createBook = async (db: Db, book: Book) => {
  const booksCollection = db.collection<Book>('books')

  const createdBook = await booksCollection.insertOne({ ...book })

  return createdBook
}

const getRecentBooks = async (db: Db) => {}
const getSearchedBooks = async (db: Db) => {}
const getBookById = async (db: Db) => {}
const getBooksByAuthorId = async (db: Db) => {}
const deleteBook = async (db: Db) => {}
const updateBook = async (db: Db) => {}
const updateBorrowedCount = async (db: Db) => {}

export {
  createBook,
  deleteBook,
  updateBook,
  updateBorrowedCount,
  getRecentBooks,
  getSearchedBooks,
  getBookById,
  getBooksByAuthorId,
}
