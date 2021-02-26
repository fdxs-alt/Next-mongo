import { uploadFile } from '@utils'
import { ObjectID } from 'mongodb'
import { Db } from 'mongodb'
export interface MulterFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}
export interface Author {
  name: string
  surname: string
  dateOfBirth: string
  dateOfDeath?: string | 'Alive'
  description: string
  books?: ObjectID[]
  image?: { Location: string; Key: string }
}

interface Book {
  id: string
  title: string
}

export interface AuthorWithID extends Author {
  _id: string
}

export interface AuthorData {
  name: string
  surname: string
  dateOfBirth: string
  dateOfDeath: string | 'Alive'
  description: string
  image: MulterFile
}

const createAuthor = async (database: Db, data: AuthorData) => {
  const authorsCollection = database.collection<Author>('authors')
  const { image, ...rest } = data
  let dateOfDeath = ''
  let location: { Location: string; Key: string } | null = null

  if (image) {
    const { Location, Key } = await uploadFile(image)
    location = { Location, Key }
  }

  if (!data.dateOfDeath) {
    dateOfDeath = 'Alive'
  } else {
    dateOfDeath = data.dateOfDeath
  }

  const newAuthor = await authorsCollection.insertOne({
    ...rest,
    dateOfDeath,
    image: location,
  })

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
    { $push: { books: new ObjectID(book.id) } }
  )

  return updatedAuthor
}

const removeBookFromAuthor = async (db: Db, id: ObjectID, bookID: ObjectID) => {
  const authorsCollection = db.collection<Author>('authors')

  const updatedAuthor = await authorsCollection.findOneAndUpdate(
    {
      _id: new ObjectID(id),
    },
    { $pull: { books: new ObjectID(bookID) } }
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
