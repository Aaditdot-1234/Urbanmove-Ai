
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { AuthError, ValidationError } from "../errors/AppErrors";
import { AsyncHandler } from "../middleware/asyncHandler";
import { AuthService } from "../services/authService";
import { generateRefreshToken, generateToken, verifyRefreshToken } from "../utils/jwt";
import { prisma } from "../utils/prisma";

export class AuthController {
    register = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const result = await AuthService.register(req.body);
        res.status(200).json({
            message: "User registered successfully",
            result,
        })
    })

    login = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const deviceId = req.headers['x-device-id'] as string | undefined;
        if (!deviceId) {
            throw new ValidationError("Device ID is required");
        }
        const { user, token, refreshToken } = await AuthService.login(req.body, deviceId);
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/auth/refresh"
        })

        res.status(200).json({
            message: "User logged in successfully",
            user
        })
    })

    logout = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken', { path: '/auth/refresh' })

        await prisma.refreshToken.updateMany({
            where: { userId: req.user.id, isRevoked: false },
            data: { isRevoked: true }
        })
        res.status(200).json({
            message: "User logged out successfully"
        })
    })

    refresh = AsyncHandler(async (
        req: Request,
        res: Response
    ) => {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new AuthError("Refresh token missing");
        }

        const decoded = verifyRefreshToken(refreshToken);

        const existingToken = await prisma.refreshToken.findUnique({
            where: {
                token: refreshToken
            }
        });

        if (!existingToken) {
            throw new AuthError("Invalid refresh token");
        }

        if (existingToken.isRevoked) {
            throw new AuthError("Refresh token revoked");
        }

        if (existingToken.expiresAt < new Date()) {
            throw new AuthError("Refresh token expired");
        }

        await prisma.refreshToken.update({
            where: {
                token: refreshToken
            },
            data: {
                isRevoked: true
            }
        });

        const newAccessToken = generateToken({
            sub: decoded.sub,
            email: decoded.email,
            jti: uuidv4()
        });

        const newRefreshToken = generateRefreshToken({
            sub: decoded.sub,
            email: decoded.email,
            jti: uuidv4()
        });

        await prisma.refreshToken.create({
            data: {
                token: newRefreshToken,
                userId: decoded.sub,
                deviceId: existingToken.deviceId,
                expiresAt: new Date(
                    Date.now() + 30 * 24 * 60 * 60 * 1000
                )
            }
        });

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/auth/refresh",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Token refreshed successfully"
        });
    });

    sendOtp = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const result = await AuthService.SendOtp(req.body)
        res.status(200).json({
            message: result,
        })
    })

    verifyOtp = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const result = await AuthService.verifyOtp(req.body)
        res.status(200).json(result)
    })

    resetPassword = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const result = await AuthService.resetPassword(req.body)
        res.status(200).json(result)
    })

    changePassword = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        const result = await AuthService.changePassword(user, req.body)
        res.status(200).json({
            message: result,
        })
    })
}