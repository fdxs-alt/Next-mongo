import { ObjectID } from 'mongodb'
import { Db } from 'mongodb'

interface Author {
  name: string
  surname: string
  dateOfBirth: Date
  dateOfDeath?: Date | 'Alive'
  description: string
  books?: [
    {
      id: ObjectID
      title: string
      genre: string
    }
  ]
}

interface Book {
  id: ObjectID
  title: string
  genre: string
}

interface AuthorData {
  name: string
  surname: string
  dateOfBirth: Date
  dateOfDeath?: Date | 'Alive'
  description: string
}

const createAuthor = async (database: Db, data: AuthorData) => {
  const authorsCollection = database.collection<Author>('authors')

  const newAuthor = await authorsCollection.insertOne(data)

  return newAuthor
}
const deleteAuthor = async (database: Db, id: ObjectID) => {
  const authorsCollection = database.collection<Author>('authors')

  const deletedAuthor = await authorsCollection.findOneAndDelete({
    _id: new ObjectID(id),
  })

  return deletedAuthor
}
const addBookToAuthor = async (db: Db, book: Book, id: ObjectID) => {
  const authorsCollection = db.collection<Author>('authors')
  const updatedAuthor = await authorsCollection.findOneAndUpdate(
    {
      _id: new ObjectID(id),
    },
    { $push: { books: { ...book, id: new ObjectID(book.id) } } }
  )

  return updatedAuthor
}

const removeBookFromAuthor = async (db: Db, id: ObjectID, bookID: ObjectID) => {
  const authorsCollection = db.collection<Author>('authors')

  const updatedAuthor = await authorsCollection.findOneAndUpdate(
    {
      _id: new ObjectID(id),
    },
    { $pull: { books: { id: new ObjectID(bookID) } } }
  )

  return updatedAuthor
}
const updateAuthorData = async (db: Db) => {}
const getAuthorById = async (db: Db, id: ObjectID) => {
  const authorsCollection = db.collection<Author>('authors')

  const author = await authorsCollection.findOne({ _id: new ObjectID(id) })

  return author
}
const getAuthors = async (db: Db) => {}

export {
  createAuthor,
  deleteAuthor,
  addBookToAuthor,
  removeBookFromAuthor,
  updateAuthorData,
  getAuthorById,
  getAuthors,
}
