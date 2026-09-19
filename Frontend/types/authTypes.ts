export interface RegisterFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    city: string;
    dateOfBirth: string;
    profilePicture?: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}
