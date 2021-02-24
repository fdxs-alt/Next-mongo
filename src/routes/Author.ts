import {
  createAuthor as create,
  getAuthors as getMany,
  getAuthorById as getOne,
  deleteAuthor as deleteOne,
} from '@db'
import { IRequest } from '@middleware'
import { NextApiResponse } from 'next'

export class AuthorControler {
  static async createAuthor(req: IRequest, res: NextApiResponse) {
    const authorData = req.body

    const db = req.db

    const newAuthor = await create(db, authorData)

    res.status(201).json({ author: { ...newAuthor.ops[0] } })
  }

  static async getAuthors(req: IRequest, res: NextApiResponse) {
    const { page } = req.params
    const db = req.db

    const authors = await getMany(db, parseInt(page))

    res.status(200).json({ authors })
  }

  static async getAuthor(req: IRequest, res: NextApiResponse) {
    const { authorId } = req.params
    const db = req.db

    const author = await getOne(db, authorId)

    res.status(200).json({ author })
  }

  static async deleteAuthor(req: IRequest, res: NextApiResponse) {
    const { authorId } = req.params
    const db = req.db

    const author = await deleteOne(db, authorId)

    console.log(author)

    res.status(200).json({ success: true })
  }
}
