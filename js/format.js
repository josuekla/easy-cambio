export function parseAmount(text) {
    const normalizedText = text.trim().replace(",", ".");
    const amount = Number(normalizedText);

    if (normalizedText === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        return null;
    }

    return amount;
}



export function formatCurrency(value, code) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: code
    }).format(value);
}
