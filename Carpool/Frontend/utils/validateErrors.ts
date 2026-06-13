import RegisterFormData from "../types/authTypes";
import { ValidateEmail } from "./validateEmail";
import { ValidateStrengthOfPass } from "./validatePassword";

export function validateErrors(data: RegisterFormData) {
    const errors: Record<string, string> = {};

    if (!data.email) {
        errors.email = "Email is required";
    } else if (!ValidateEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (!data.password) {
        errors.password = "Password is required";
    } else if (data.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    } else {
        const strengthError = ValidateStrengthOfPass(data.password);
        if (strengthError) {
            errors.password = strengthError;
        }
    }

    if (!data.phone) {
        errors.phone = "Phone number is required";
    }

    if (!data.name) {
        errors.name = "Name is required";
    } else if (data.name.length < 3) {
        errors.name = "Name must be at least 3 characters long";
    }

    if (!data.city) {
        errors.city = "City is required";
    }

    return errors;
}
