import { NextFunction, Request, Response } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message;

  if (isJSONSyntaxError(err)) {
    statusCode = 400;
  }

  console.log(JSON.stringify({ statusCode, message }));
  const response: { message: string; stack?: string } = { message };
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

function isJSONSyntaxError(error: Error) {
  return error instanceof SyntaxError && /Unexpected token/.test(error.message);
}
