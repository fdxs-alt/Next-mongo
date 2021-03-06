import {
  createAuthor as create,
  getAuthors as getMany,
  getAuthorById as getOne,
  deleteAuthor as deleteOne,
  MulterFile,
  updateAuthorData,
} from '@db'
import { IRequest } from '@middleware'
import { NextApiResponse } from 'next'

interface IReqestWithFile extends IRequest {
  file: MulterFile
}

export class AuthorControler {
  static async createAuthor(req: IReqestWithFile, res: NextApiResponse) {
    const authorData = req.body
    const image = req.file
    const db = req.db

    const newAuthor = await create(db, { ...authorData, image })

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

  static async update(req: IRequest, res: NextApiResponse) {
    const { authorId } = req.params
    const updateData = req.body
    const db = req.db

    const author = await updateAuthorData(db, authorId, updateData)

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
