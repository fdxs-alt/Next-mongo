import { ObjectID, Timestamp } from 'mongodb'
import { Db } from 'mongodb'

interface Book {
  authorId: ObjectID
  title: string
  publishDate: Date
  publishPlace: string
  extraInfo?: string
  description: string
  count: number
  genre: string[]
  borrowed: number
  timeAdded: Timestamp
}

const createBook = async (db: Db, book: Book) => {
  const booksCollection = db.collection<Book>('books')

  const createdBook = await booksCollection.insertOne({
    ...book,
    authorId: new ObjectID(book.authorId),
  })

  return createdBook
}

const getRecentBooks = async (db: Db, page: number) => {
  const booksCollection = db.collection<Book>('books')

  const books = await booksCollection
    .find()
    .sort({ timeAdded: -1 })
    .skip(page * 20)
    .limit(20)
    .toArray()

  return books
}
const getSearchedBooks = async (db: Db) => {}
const getBookById = async (db: Db, id: string) => {
  const booksCollection = db.collection<Book>('books')

  const book = await booksCollection.findOne({ _id: new ObjectID(id) })

  return book
}

const getBooksByAuthorId = async (db: Db, id: string) => {
  const booksCollection = db.collection<Book>('books')

  const book = await booksCollection
    .find({ authorId: new ObjectID(id) })
    .toArray()

  return book
}

const deleteBook = async (db: Db, id: string) => {
  const booksCollection = db.collection<Book>('books')

  const book = await booksCollection.deleteOne({ _id: new ObjectID(id) })

  return book
}
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
