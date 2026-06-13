import { OtpPurpose } from "@prisma/client";
import * as dotenv from "dotenv";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import { AuthError, ConflictError, ForbiddenError, NotFoundError } from "../errors/AppErrors";
import { changePasswordPayload, LoginPayload, RegisterPayload } from "../models/auth.model";
import { generateRefreshToken, generateToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";
import { prisma } from "../utils/prisma";
import { UserAuthSafeSelect, UserSafeSelect } from "../utils/selectors/auth.selector";


dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export class AuthService {


    static async register(body: RegisterPayload) {
        const { name, email, phone, password, city, dateOfBirth, profilePicture } = body;

        const formattedEmail = email.toLowerCase().trim();
        const formattedPhone = phone.replace(/\s/g, '').trim();
        const formattedDateOfBirth = new Date(dateOfBirth);
        const hashedPassword = await hashPassword(password);

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: formattedEmail },
                    { phone: formattedPhone }
                ]
            },
            select: UserSafeSelect,
        })

        if (existingUser) {
            throw new ConflictError("User already exists")
        }

        const user = await prisma.user.create({
            data: {
                name,
                email: formattedEmail,
                phone: formattedPhone,
                password: hashedPassword,
                city,
                dateOfBirth: formattedDateOfBirth,
                profilePicture,
            },
            select: UserSafeSelect
        })
        return user
    }

    static async login(body: LoginPayload, deviceId: string) {
        const { email, password } = body;

        const formattedEmail = email.toLowerCase().trim();
        const user = await prisma.user.findUnique({
            where: {
                email: formattedEmail
            },
            select: UserAuthSafeSelect
        })

        if (!user) {
            throw new NotFoundError("User")
        }

        if (!user.isActive) {
            throw new AuthError("User is not active")
        }

        if (user.isBanned) {
            throw new ForbiddenError("User is banned")
        }

        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid) {
            throw new AuthError("Invalid credentials")
        }

        const jti = uuidv4();
        const token = generateToken({
            sub: user.id,
            email: user.email,
            jti,
        })

        const jti_refresh = uuidv4();
        const refreshToken = generateRefreshToken({
            sub: user.id,
            email: user.email,
            jti: jti_refresh,
        })

        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                token: refreshToken,
                deviceId,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            }
        })

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                lastLoginAt: new Date(),
            },
        })

        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token,
            refreshToken,
        }
    }

    static async SendOtp(body: { email: string, purpose: OtpPurpose }) {
        const { email, purpose } = body;

        const formattedEmail = email.toLowerCase().trim();

        const user = await prisma.user.findUnique({
            where: {
                email: formattedEmail,
            },
            select: UserSafeSelect
        })

        if (!user) {
            throw new NotFoundError("User with that email does not exist.");
        }

        // Invalidate any existing unused OTPs for this user + purpose
        await prisma.otpVerification.updateMany({
            where: { userId: user.id, purpose, isUsed: false },
            data: { isUsed: true }
        })

        const otp = Math.floor(100000 + Math.random() * 900000);

        await prisma.otpVerification.create({
            data: {
                userId: user.id,
                code: otp.toString(),
                purpose: purpose,
                attempts: 0,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            }
        })

        await resend.emails.send({
            to: [email],
            from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
            subject: "Otp Verification",
            html: "<h1>Email from React Native</h1>",
        })

        return 'OTP Send successfully.';
    }

    static async verifyOtp(body: {email:string, otp: string, purpose: OtpPurpose}) {
        const { email, otp, purpose } = body;

        const formattedEmail = email.toString().trim();

        const user = await prisma.user.findUnique({
            where: {
                email: formattedEmail,
            },
            select: UserSafeSelect
        })

        if (!user) {
            throw new NotFoundError("No user with this email id.")
        }

        const otpRecord = await prisma.otpVerification.findFirst({
            where: {
                userId: user.id,
                purpose: purpose,
                isUsed: false,
                expiresAt: { gte: new Date() },
                attempts: { lt: 5 }
            },
            orderBy: { createdAt: 'desc' }
        })

        if (!otpRecord) {
            throw new AuthError("OTP expired or too many attempts. Please request a new one.")
        }

        if (otpRecord.code !== otp.toString()) {
            await prisma.otpVerification.update({
                where: { id: otpRecord.id },
                data: { attempts: { increment: 1 } }
            })
            throw new AuthError("Invalid OTP")
        }

        await prisma.otpVerification.update({
            where: { id: otpRecord.id },
            data: { isUsed: true }
        })

        if (purpose === "EMAIL_VERIFICATION") {
            await prisma.user.update({
                where: { id: user.id },
                data: { isEmailVerified: true }
            })
            return { message: "OTP verified successfully." }
        }

        if (purpose === "PHONE_VERIFICATION") {
            await prisma.user.update({
                where: { id: user.id },
                data: { isPhoneVerified: true }
            })
            return { message: "OTP verified successfully." }
        }

        if (purpose === "PASSWORD_RESET") {
            const resetToken = uuidv4();
            await prisma.passwordResetToken.create({
                data: {
                    userId: user.id,
                    token: resetToken,
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                }
            })
            return { message: "OTP verified successfully.", resetToken }
        }

        return { message: "OTP verified successfully." }
    }

    static async resetPassword(body: { resetToken: string, newPassword: string }) {
        const { resetToken, newPassword } = body;

        const tokenRecord = await prisma.passwordResetToken.findUnique({
            where: { token: resetToken }
        })

        if (!tokenRecord) {
            throw new AuthError("Invalid or expired reset token.")
        }

        if (tokenRecord.usedAt) {
            throw new AuthError("Reset token has already been used.")
        }

        if (tokenRecord.expiresAt < new Date()) {
            throw new AuthError("Reset token has expired.")
        }

        const hashedPassword = await hashPassword(newPassword)

        await prisma.user.update({
            where: { id: tokenRecord.userId },
            data: { password: hashedPassword }
        })

        await prisma.passwordResetToken.update({
            where: { id: tokenRecord.id },
            data: { usedAt: new Date() }
        })

        return { message: "Password reset successfully." }
    }

    static async changePassword(user: changePasswordPayload, body: {oldPassword:string, newPassword:string}) {
        const { oldPassword, newPassword } = body;

        const isPasswordValid = await comparePassword(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new AuthError("Invalid old password");
        }

        const hashedPassword = await hashPassword(newPassword);

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        })

        return "Password changed successfully.";
    }
}