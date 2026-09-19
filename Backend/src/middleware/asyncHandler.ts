import { NextFunction, Request, RequestHandler, Response } from "express"

type AsyncHanlderFn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const AsyncHandler = (fn: AsyncHanlderFn): RequestHandler => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);