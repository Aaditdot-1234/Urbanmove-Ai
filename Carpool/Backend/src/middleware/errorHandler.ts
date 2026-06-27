import { Request, Response, NextFunction, } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../errors/AppErrors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("[ErrorHandler]", err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            isOperational: err.isOperational,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined
        })
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            return res.status(409).json({ success: false, message: "A record with this information already exists." });
        }
        if (err.code === "P2025") {
            return res.status(404).json({ success: false, message: "Record not found." });
        }
    }

    if (err instanceof Prisma.PrismaClientInitializationError) {
        return res.status(503).json({ success: false, message: "Database connection failed. Check DATABASE_URL." });
    }

    res.status(500).json({ message: "Unexpected Server error." });
}