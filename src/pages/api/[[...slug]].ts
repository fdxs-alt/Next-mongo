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
  .get('/api/auth/me', asyncHandler(AuthController.me))
  .post('/api/auth/login', asyncHandler(AuthController.login))
  .post('/api/auth/register', asyncHandler(AuthController.register))
  .post('/api/auth/logout', asyncHandler(AuthController.logout))
  // AUTHOR
  .get(
    '/api/admin/authors/:page',
    authMiddleware,
    asyncHandler(AuthorControler.getAuthors)
  )
  .get(
    '/api/admin/author/:authorId',
    authMiddleware,
    asyncHandler(AuthorControler.getAuthor)
  )
  .post(
    '/api/admin/author/create',
    adminAuthMiddleware,
    asyncHandler(AuthorControler.createAuthor)
  )
  .delete(
    '/api/admin/author/:authorId',
    adminAuthMiddleware,
    asyncHandler(AuthorControler.deleteAuthor)
  )
  // BOOK
  .get(
    '/api/admin/book/:bookId',
    authMiddleware,
    asyncHandler(BookController.getBook)
  )
  .get(
    '/api/admin/books/:page',
    authMiddleware,
    asyncHandler(BookController.getBooks)
  )
  .get(
    '/api/admin/book/author/:authorId',
    authMiddleware,
    asyncHandler(BookController.getByAuthor)
  )
  .post(
    '/api/admin/book/create',
    adminAuthMiddleware,
    asyncHandler(BookController.createBook)
  )
  .delete(
    '/api/admin/book/:bookId',
    adminAuthMiddleware,
    asyncHandler(BookController.deleteBook)
  )

export default withSession(handler)
