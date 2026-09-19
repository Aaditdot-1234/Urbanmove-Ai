import { NextFunction, Request, Response } from "express";
import { AuthError } from "../errors/AppErrors";
import { AsyncHandler } from "../middleware/asyncHandler";
import { UsersService } from "../services/usersService";
import { prisma } from "../utils/prisma";
import { OtpPurpose } from "@prisma/client";

export class UserController {
    getUserDetail = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            throw new AuthError('User not found')
        }

        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        })

        if (!loggedInUser) {
            throw new AuthError('User not found.')
        }

        const { password, ...userWithoutPassword } = loggedInUser;
        res.status(200).json({
            message: 'User data fetched successfully.',
            data: userWithoutPassword,
        })
    })

    updateUserDetail = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            throw new AuthError('User not found')
        }

        const result = await UsersService.updateUserDetail(user.id, req.body);

        res.status(200).json({
            message: 'User detail updated successfully.',
            data: result,
        })
    })

    updateProfilePictiure = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email;

        const result = await UsersService.updateProfilePicture(email, req.body.profilePicture);

        res.status(200).json({
            message: 'Profile picture updated successfully.',
            data: result,
        })
    })

    generateEmailChangeOtp = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user.id;
        const newEmail = req.body.newEmail;

        const result = await UsersService.requestChange(userId, newEmail, OtpPurpose.EMAIL_VERIFICATION);

        res.status(200).json({
            message: result
        })
    })

    updateEmail = AsyncHandler(async (req:Request, res:Response, next: NextFunction) => {
        const userId = req.user.id;
        const otp = req.body.otp;

        const result = await UsersService.verifyChange(userId, otp, OtpPurpose.EMAIL_VERIFICATION);

        res.status(200).json({
            message: result.message,
            email: result.email,
        })
    })

}