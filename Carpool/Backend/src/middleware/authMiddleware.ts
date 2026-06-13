import { NextFunction, Request, Response } from "express";
import { AsyncHandler } from "./asyncHandler";
import { AuthError } from "../errors/AppErrors";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../utils/prisma";
import { UserAuthSafeSelect } from "../utils/selectors/auth.selector";

export const authMiddleware = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        throw new AuthError("No token provided");
    }
    const payload = verifyToken(accessToken);
    const user = await prisma.user.findUnique({
        where: { id: payload.sub },
        select: UserAuthSafeSelect
    })
    if (!user) {
        throw new AuthError("User not found");
    }
    req.user = user;
    next();
})