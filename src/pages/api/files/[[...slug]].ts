import { AuthorControler, BookController } from '@controllers'
import {
  errorHandler,
  database,
  asyncHandler,
  IRequest,
  adminAuthMiddleware,
  withSession,
  common,
} from '@middleware'
import { NextApiResponse } from 'next'
import nc from 'next-connect'
import cors from 'cors'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const handler = nc<IRequest, NextApiResponse>({
  onError: errorHandler,
  attachParams: true,
})
  .use(database)
  .use(common)
  .use(cors({ credentials: true, origin: 'http://localhost:3000' }))
  .post(
    '/api/files/admin/author/create',
    adminAuthMiddleware,
    upload.single('image'),
    asyncHandler(AuthorControler.createAuthor)
  )
  .post(
    '/api/files/admin/book/create',
    adminAuthMiddleware,
    asyncHandler(BookController.createBook)
  )

export default withSession(handler)

export const config = {
  api: {
    bodyParser: false,
  },
}
