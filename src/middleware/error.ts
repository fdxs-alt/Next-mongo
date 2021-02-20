import { IRequest } from '@middleware'
import { NextApiResponse } from 'next'
import { ErrorHandler } from 'next-connect'

export class ErrorWithCode extends Error {
  code: number
  constructor({ message, code }: { message: string; code: number }) {
    super(message)
    this.code = code
  }
}

const errorHandler: ErrorHandler<IRequest, NextApiResponse> = (
  err: { code: number; message: string },
  req,
  res,
  next
) => {
  res
    .status(err.code || 500)
    .json({ message: err.message || 'Internal server error' })
}

export default errorHandler
