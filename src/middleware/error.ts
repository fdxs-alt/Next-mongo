import { IRequest } from "./index";
import { NextApiResponse } from "next";
import { ErrorHandler } from "next-connect";

export class ErrorWithCode extends Error {
  code: number;
  constructor({ message, code }: { message: string; code: number }) {
    super(message);
    this.code = code;
  }
}

const errorHandler: ErrorHandler<IRequest, NextApiResponse> = (
  err: { code: number; message: string },
  req,
  res,
  next
) => {
  res.status(err.code).json({ message: err.message });
};

export default errorHandler;
