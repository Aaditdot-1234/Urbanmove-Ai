import { Request, Response, NextFunction, } from "express";
import { AppError } from "../errors/AppErrors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            isOperational: err.isOperational,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined
        })
    }

    res.status(500).json({ message: "Unexpected Server error." });
}