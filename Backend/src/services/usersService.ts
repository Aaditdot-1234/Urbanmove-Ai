import { EmergencyContact, OtpPurpose } from "@prisma/client";
import * as dotenv from "dotenv";
import { Resend } from "resend";
import { AuthError, NotFoundError } from "../errors/AppErrors";
import { UpdateUserPayload } from "../models/user.model";
import { prisma } from "../utils/prisma";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export class UsersService {
    static async updateUserDetail(userId: string, userInfo: Partial<UpdateUserPayload>) {
        const { name, city, dateOfBirth, bio, gender } = userInfo;

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!existingUser) {
            throw new AuthError('User not found')
        }

        const updateduser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name,
                city,
                dateOfBirth,
                bio,
                gender,
            }
        })

        const { password, ...updatedUserWithoutPassword } = updateduser;
        return updatedUserWithoutPassword;
    }

    static async updateProfilePicture(userId: string, newProfilePicture: string) {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!existingUser) {
            throw new AuthError('User not found')
        }

        const updatedProfilePicture = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                profilePicture: newProfilePicture,
            },
            select: {
                profilePicture: true
            }
        })

        return updatedProfilePicture.profilePicture;
    }

    static async requestChange(userId: string, change: string, purpose: OtpPurpose) {
        const formattedChange = change.toLowerCase().trim();

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
            }
        })

        if (!existingUser) {
            throw new AuthError('Not logged in.')
        }

        const invalidateExistingOtps = await prisma.otpVerification.updateMany({
            where: {
                userId: existingUser.id,
                purpose: purpose,
                isUsed: false
            },
            data: {
                isUsed: true
            }
        })

        const otp = Math.floor(100000 + Math.random() * 900000);

        const otpCreation = await prisma.otpVerification.create({
            data: {
                userId: existingUser.id,
                code: otp.toString(),
                purpose: purpose,
                newValue: formattedChange,
                attempts: 0,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            }
        })

        if (purpose === OtpPurpose.EMAIL_VERIFICATION) {
            await resend.emails.send({
                to: [formattedChange],
                from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
                subject: "Otp Verification",
                html: "<h1>Email from React Native</h1>",
            })
        }

        if (purpose === OtpPurpose.PHONE_VERIFICATION) {
            await resend.emails.send({
                to: [formattedChange],
                from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
                subject: "Otp Verification",
                html: "<h1>Email from React Native</h1>",
            })
        }

        return 'OTP Send successfully.';
    }


    static async verifyChange(userid: string, otp: string, purpose: OtpPurpose) {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userid,
            }
        })

        if (!existingUser) {
            throw new AuthError('User not found.')
        }

        const otpVerification = await prisma.otpVerification.findFirst({
            where: {
                userId: userid,
                purpose: purpose,
                isUsed: false,
                attempts: {
                    lt: 5
                },
                expiresAt: {
                    gte: new Date(),
                },
            },
            orderBy: {
                createdAt: 'desc',
            }
        })

        if (!otpVerification) {
            throw new AuthError("Otp expired or too many attempts. Try again.");
        }

        if (otpVerification.code !== otp.toString()) {
            await prisma.otpVerification.update({
                where: {
                    id: otpVerification.id,
                    userId: userid,
                    purpose: purpose,
                },
                data: {
                    attempts: {
                        increment: 1
                    },
                }
            })
            throw new AuthError("Invalid OTP.");
        }

        const formattedValue = otpVerification.newValue;

        if (!formattedValue) {
            throw new AuthError("Otp is not linked to an email change request.");
        }

        const updateOtp = await prisma.otpVerification.update({
            where: {
                id: otpVerification.id,
                userId: userid,
                purpose: purpose,
                isUsed: false,
                expiresAt: { gte: new Date() }
            },
            data: {
                isUsed: true
            }
        })

        if (purpose === OtpPurpose.EMAIL_VERIFICATION) {
            const emailAlreadyExists = await prisma.user.findUnique({
                where: {
                    email: formattedValue,
                }
            })

            if (emailAlreadyExists) {
                throw new AuthError('Email already exists.');
            }

            const updatedUser = await prisma.user.update({
                where: {
                    id: userid,
                },
                data: {
                    email: formattedValue,
                    isEmailVerified: true,
                },
                select: {
                    email: true,
                }
            })

            return { email: updatedUser.email, message: 'Email changed successfully.' };
        }

        const phoneAlreadyExists = await prisma.user.findUnique({
            where: {
                phone: formattedValue,
            }
        })

        if (phoneAlreadyExists) {
            throw new AuthError('Phone already exists.');
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userid,
            },
            data: {
                phone: formattedValue,
                isPhoneVerified: true,
            },
            select: {
                phone: true,
            }
        })

        return { phone: updatedUser.phone, message: 'Phone changed successfully.' };
    }

    static async addEmergencyContacts(userid: string, emergencyContacts: EmergencyContact[]) {
        const formattedEmergencyContacts = emergencyContacts.map((contact) => {
            return {
                name: contact.name.toLowerCase().trim(),
                relationship: contact.relationship.toLowerCase().trim(),
                phone: contact.phone.trim(),
            }
        })

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userid,
            }
        })

        if (!existingUser) {
            throw new AuthError('User not exists');
        }

        let newContacts: EmergencyContact[] = [];

        for (const contact of formattedEmergencyContacts) {
            const existingEmergencyContact = await prisma.emergencyContact.findFirst({
                where: {
                    userId: userid,
                    name: contact.name,
                    relationship: contact.relationship,
                    phone: contact.phone,
                }
            })

            if (existingEmergencyContact) {
                throw new AuthError('Emergency contact already exists');
            }

            const newEmergencyContact = await prisma.emergencyContact.create({
                data: {
                    userId: userid,
                    name: contact.name,
                    relationship: contact.relationship,
                    phone: contact.phone,
                }
            })

            newContacts.push(newEmergencyContact);
        }

        return {newContacts, message: 'Emergency contacts added successfully.'};
    }

    static async updateEmergencyContacts(userId: string, emergencyContact: EmergencyContact){
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if(!existingUser){
            throw new AuthError("User not exists");
        }

        const existingEmergencyContact = await prisma.emergencyContact.findFirst({
            where: {
                userId: userId,
                id: emergencyContact.id,
            }
        })

        if(!existingEmergencyContact){
            throw new AuthError("Emergency contact not exists");
        }

        const updatedEmergencyContact = await prisma.emergencyContact.update({
            where: {
                id: emergencyContact.id,
            },
            data: {
                name: emergencyContact.name.toLowerCase().trim(),
                relationship: emergencyContact.relationship.toLowerCase().trim(),
                phone: emergencyContact.phone.trim(),
            }
        })

        return {updatedEmergencyContact, message: 'Emergency contact updated successfully.'};
    }

    static async removeEmergencyContacts(userId: string, emergencyContactIds: string[]){
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if(!existingUser){
            throw new AuthError("User not exists");
        }

        const deletedContacts: EmergencyContact[] = [];

        for(const id of emergencyContactIds){
            const existingEmergencyContact = await prisma.emergencyContact.findFirst({
                where: {
                    userId: userId,
                    id: id,
                }
            })

            if(!existingEmergencyContact){
                throw new AuthError("Emergency contact not exists");
            }

            const deletedEmergencyContact = await prisma.emergencyContact.delete({
                where: {
                    id: id,
                }
            })

            deletedContacts.push(deletedEmergencyContact);
        }

        return {deletedContacts, message: 'Emergency contacts removed successfully.'};
    }

    static async getAllEmergencyContacts(userId: string){
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if(!existingUser){
            throw new AuthError("User not exists");
        }

        const emergencyContacts = await prisma.emergencyContact.findMany({
            where: {
                userId: userId,
            }
        })

        return {emergencyContacts, message: 'Emergency contacts fetched successfully.'};
    }

    static async setPrimaryEmergencyConatct(userId: string, contactId: string){
        const existinguser = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if(!existinguser){
            throw new AuthError('User not exists.')
        }

        const existingEmergencyContact = await prisma.emergencyContact.findUnique({
            where: {
                id: contactId,
            }
        })

        if(!existingEmergencyContact){
            throw new NotFoundError('Emergency contact')
        }

        const updatePrimary = await prisma.emergencyContact.update({
            where: {
                id: contactId,
            }, 
            data: {
                isPrimary: true,
            }
        })

        return {primaryContact: updatePrimary, message: 'Primary emergency contact set successfully.'}
    }
    
    static async deleteAccount(userId: string){
        const existsingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if(!existsingUser){
            throw new AuthError('User not exists.')
        }

        const deleteAccount = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                isActive: false,
            }
        })

        return {message: 'Account deleted successfully.'}
    }
}