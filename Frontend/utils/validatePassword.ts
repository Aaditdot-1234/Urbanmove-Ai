export function ValidateStrengthOfPass(value: string) {
    if (!/[A-Z]/.test(value)) {
        return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
        return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(value)) {
        return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
        return "Password must contain at least one special character";
    }
}
