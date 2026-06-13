import { Request, Response, NextFunction } from "express";
import { ZodType, z } from "zod";

export const validate =
    (schema: ZodType<any, any, any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            const result = schema.safeParse({
                body: req.body,
                query: req.query,
                params: req.params
            })

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: z.treeifyError(result.error),
                })
            }
            next();
        };