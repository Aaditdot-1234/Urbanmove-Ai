import { loginUser } from "@/services/authService";
import { showToast } from "@/services/toastService";
import { useState } from "react";
import { validateErrors } from "../utils/validateErrors";

const EMPTY_FORM = { email: "", password: "" };

export default function useLoginForm() {
    const [formData, setFormData] = useState({ ...EMPTY_FORM });
    const [error, setError] = useState<Record<string, string>>({});

    const handleLogin = async () => {
        const errorMsg = validateErrors(formData);
        if (Object.keys(errorMsg).length > 0) {
            setError(errorMsg);
            return;
        }

        try {
            const result = await loginUser(formData);
            setFormData({ ...EMPTY_FORM });
            setError({});
            showToast(result.message, "success");
        } catch (err: any) {
            const message = err?.response?.data?.message ?? "Login failed. Please try again.";
            showToast(message, "error");
        }
    };

    return { formData, setFormData, handleLogin, error };
}
