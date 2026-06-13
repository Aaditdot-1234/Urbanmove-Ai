export interface RegisterPayload {
    name: string;
    email: string;
    phone: string;
    password: string;
    city: string;
    dateOfBirth: string;
    profilePicture?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface changePasswordPayload {
    name: string;
    id: string;
    email: string;
    password: string;
    isActive: boolean;
    isBanned: boolean;
}