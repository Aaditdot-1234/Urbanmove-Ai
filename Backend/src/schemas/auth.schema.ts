import { z } from "zod";

export const RegisterSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        email: z.email(),
        phone: z.string().min(10),
        password: z.string().min(8),
        city: z.string().min(2),
        dateOfBirth: z.string(),
        profilePicture: z.string().optional(),
    })
})

export const LoginSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string(),
    })
})

export const SendOtpSchema = z.object({
    body: z.object({
        email: z.email(),
        purpose: z.enum(["PHONE_VERIFICATION", "EMAIL_VERIFICATION", "PASSWORD_RESET", "LOGIN"])
    })
})

export const VerifyOtpSchema = z.object({
    body: z.object({
        email: z.email(),
        otp: z.string(),
        purpose: z.enum(["PHONE_VERIFICATION", "EMAIL_VERIFICATION", "PASSWORD_RESET", "LOGIN"])
    })
})

export const ResetPasswordSchema = z.object({
    body: z.object({
        resetToken: z.string().min(1),
        newPassword: z.string().min(8),
    })
})

export const ChangePasswordSchema = z.object({
    body: z.object({
        oldPassword: z.string().min(8),
        newPassword: z.string().min(8),
    })
})

export type RegisterInput = z.infer<typeof RegisterSchema>["body"]
export type LoginInput = z.infer<typeof LoginSchema>["body"]
export type SendOtpInput = z.infer<typeof SendOtpSchema>["body"]
export type VerifyOtpInput = z.infer<typeof VerifyOtpSchema>["body"]
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>["body"]
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>["body"]