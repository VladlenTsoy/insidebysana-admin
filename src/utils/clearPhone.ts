type ClearPhoneType = (phone: string) => string

export const clearPhone: ClearPhoneType = (phone) => {
    // Удаляем лишние символы
    return phone
        .replaceAll(" ", "")
        .replaceAll("-", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
}
