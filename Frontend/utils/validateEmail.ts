export function ValidateEmail(value: string) {
    if (value.includes("@")) {
        let pos = value.indexOf("@");
        let dotPos = value.lastIndexOf(".");
        if (pos < dotPos) {
            return true;
        }
    }
    return false;
}