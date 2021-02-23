import {
  createBook as create,
  deleteBook as deleteOne,
  getBooksByAuthorId,
  getBookById,
  getRecentBooks,
} from '@db'
import { IRequest } from '@middleware'
import { NextApiResponse } from 'next'

export class BookController {
  static async getBook(req: IRequest, res: NextApiResponse) {
    const { bookId } = req.params
    const db = req.db

    const book = await getBookById(db, bookId)

    res.status(200).json({ book })
  }

  static async createBook(req: IRequest, res: NextApiResponse) {
    const book = req.body
    const db = req.db

    const newBook = await create(db, book)

    res.status(200).json({ newBook })
  }

  static async getByAuthor(req: IRequest, res: NextApiResponse) {
    const { authorId } = req.params
    const db = req.db

    const book = await getBooksByAuthorId(db, authorId)

    res.status(200).json({ book })
  }

  static async deleteBook(req: IRequest, res: NextApiResponse) {
    const { bookId } = req.params
    const db = req.db

    const book = await deleteOne(db, bookId)

    console.log(book)

    res.status(200).json({ success: true })
  }

  static async getBooks(req: IRequest, res: NextApiResponse) {
    const { page } = req.params
    const db = req.db

    const books = await getRecentBooks(db, parseInt(page))

    res.status(200).json({ books })
  }
}
