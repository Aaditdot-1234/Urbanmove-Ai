import { Gender } from "@prisma/client";
import { RegisterPayload } from "./auth.model";

export interface UpdateUserPayload extends Omit<RegisterPayload, 'email' | 'phone' | 'profilePicture' | 'password'> {
    bio: string;
    gender: Gender;
}