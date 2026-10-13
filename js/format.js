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


export function formatRate(value) {
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    }).format(value);
}


export function formatDate(isoDate) {
    if (!isoDate) {
        return "Data indisponível";
    }

    const date = new Date(isoDate);

    if (Number.isNaN(date.getTime())) {
        return "Data indisponível";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC"
    }).format(date);
}
