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
    }
  ]
}

interface Book {
  id: string
  title: string
}

export interface AuthorData {
  name: string
  surname: string
  dateOfBirth: Date
  dateOfDeath: Date | 'Alive'
  description: string
}

const createAuthor = async (database: Db, data: AuthorData) => {
  const authorsCollection = database.collection<Author>('authors')

  const newAuthor = await authorsCollection.insertOne(data)

  return newAuthor
}
const deleteAuthor = async (database: Db, id: string) => {
  const authorsCollection = database.collection<Author>('authors')

  const deletedAuthor = await authorsCollection.findOneAndDelete({
    _id: new ObjectID(id),
  })

  return deletedAuthor
}
const addBookToAuthor = async (db: Db, book: Book, id: string) => {
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
const getAuthorById = async (db: Db, id: string) => {
  const authorsCollection = db.collection<Author>('authors')

  const author = await authorsCollection.findOne({ _id: new ObjectID(id) })

  return author
}
const getAuthors = async (db: Db, page: number) => {
  const authorsCollection = db.collection<Author>('authors')

  const authors = await authorsCollection
    .find()
    .sort({ surname: 1 })
    .limit(20)
    .skip(page * 20)
    .toArray()

  return authors
}

export {
  createAuthor,
  deleteAuthor,
  addBookToAuthor,
  removeBookFromAuthor,
  updateAuthorData,
  getAuthorById,
  getAuthors,
}
