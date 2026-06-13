import Toast from "react-native-toast-message";

export const showToast = (
    message: string,
    type: "success" | "error" | "info",
    subtitle?: string
) => {
    Toast.show({
        type,
        text1: message,
        text2: subtitle,
    });
};

export const hideToast = () => {
    Toast.hide();
};
