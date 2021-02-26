import { AuthController, AuthorControler, BookController } from '@controllers'
import {
  errorHandler,
  database,
  asyncHandler,
  IRequest,
  adminAuthMiddleware,
  authMiddleware,
  withSession,
  common,
} from '@middleware'
import { NextApiResponse } from 'next'
import nc from 'next-connect'
import cors from 'cors'

const handler = nc<IRequest, NextApiResponse>({
  onError: errorHandler,
  attachParams: true,
})
  .use(database)
  .use(common)
  .use(cors({ credentials: true, origin: 'http://localhost:3000' }))
  // AUTH
  .get('/api/parser/auth/me', asyncHandler(AuthController.me))
  .post('/api/parser/auth/login', asyncHandler(AuthController.login))
  .post('/api/parser/auth/register', asyncHandler(AuthController.register))
  .post('/api/parser/auth/logout', asyncHandler(AuthController.logout))
  // AUTHOR
  .get(
    '/api/parser/admin/authors/:page',
    authMiddleware,
    asyncHandler(AuthorControler.getAuthors)
  )
  .get(
    '/api/parser/admin/author/:authorId',
    authMiddleware,
    asyncHandler(AuthorControler.getAuthor)
  )
  .delete(
    '/api/parser/admin/author/:authorId',
    adminAuthMiddleware,
    asyncHandler(AuthorControler.deleteAuthor)
  )
  // BOOK
  .get(
    '/api/parser/admin/book/:bookId',
    authMiddleware,
    asyncHandler(BookController.getBook)
  )
  .get(
    '/api/parser/admin/books/:page',
    authMiddleware,
    asyncHandler(BookController.getBooks)
  )
  .get(
    '/api/parser/admin/book/author/:authorId',
    authMiddleware,
    asyncHandler(BookController.getByAuthor)
  )
  .delete(
    '/api/parser/admin/book/:bookId',
    adminAuthMiddleware,
    asyncHandler(BookController.deleteBook)
  )

export default withSession(handler)
