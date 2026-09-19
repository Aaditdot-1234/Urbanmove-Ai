import { Prisma } from "@prisma/client";

export const UserSafeSelect = {
    id: true,
    name: true,
    email: true,
    phone: true,
    city: true,
    profilePicture: true,
    bio: true,
    gender: true,
    dateOfBirth: true,
    isActive: true,
    isBanned: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    lastLoginAt: true,
    averageRating: true,
    totalRides: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.UserSelect;

export const UserAuthSafeSelect = {
    ...UserSafeSelect,
    password: true,
} satisfies Prisma.UserSelect;
