import { registerUser } from "@/services/authService";
import { showToast } from "@/services/toastService";
import { useState } from "react";
import { validateErrors } from "../utils/validateErrors";

const EMPTY_FORM = {
    name: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    dateOfBirth: "",
    profilePicture: "",
};

export default function useRegisterForm() {
    const [formData, setFormData] = useState({ ...EMPTY_FORM });
    const [error, setError] = useState<Record<string, string>>({});

    const handlePublish = async () => {
        const errorMsg = validateErrors(formData);
        if (Object.keys(errorMsg).length > 0) {
            setError(errorMsg);
            return;
        }

        try {
            const result = await registerUser(formData);
            setFormData({ ...EMPTY_FORM });
            setError({});
            showToast(result.message, "success");
        } catch (err: any) {
            const message = err?.response?.data?.message ?? "Registration failed. Please try again.";
            showToast(message, "error");
        }
    };

    return { formData, setFormData, handlePublish, error };
}
