
export function renderCurrencyOptions(currencies) {
    const fromSelect = document.getElementById("from-currency");
    const toSelect = document.getElementById("to-currency");

    fromSelect.replaceChildren();
    toSelect.replaceChildren();

    const placeholderFrom = document.createElement("option");
    placeholderFrom.value = "";
    placeholderFrom.textContent = "Selecione a moeda de origem";

    const placeholderTo = document.createElement("option");
    placeholderTo.value = "";
    placeholderTo.textContent = "Selecione a moeda de destino";

    fromSelect.appendChild(placeholderFrom);
    toSelect.appendChild(placeholderTo);

    currencies.forEach((currency) => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency.code;
        optionFrom.textContent = `${currency.code} - ${currency.name}`;

        const optionTo = document.createElement("option");
        optionTo.value = currency.code;
        optionTo.textContent = `${currency.code} - ${currency.name}`;

        fromSelect.appendChild(optionFrom);
        toSelect.appendChild(optionTo);
    });
}


export function renderQuote(from, to, rate, date) {
    const quote = document.getElementById("quote");

    quote.replaceChildren();

    const message = document.createElement("p");
    message.textContent =
        `1 ${from} = ${rate} ${to} (cotação de ${date})`;

    quote.appendChild(message);
}


export function clearQuote() {
    const quote = document.getElementById("quote");
    quote.replaceChildren();
}



export function renderResult({
    amount,
    from,
    to,
    rate,
    convertedAmount
}) {
    const result = document.getElementById("result");

    result.replaceChildren();

    const title = document.createElement("h3");
    title.textContent = "Resultado da conversão";

    const details = document.createElement("p");
    details.textContent =
        `${amount} ${from} = ${convertedAmount} ${to}`;

    result.appendChild(title);
    result.appendChild(details);
}


export function clearResult() {
    const result = document.getElementById("result");
    result.replaceChildren();
}


export function showLoading(message) {
    const status = document.getElementById("status");

    status.replaceChildren();
    status.textContent = message;
}


export function clearStatus() {
    const status = document.getElementById("status");

    status.replaceChildren();
}


export function showError(message, onRetry) {
    const status = document.getElementById("status");

    status.replaceChildren();

    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    status.appendChild(errorMessage);

    if (onRetry) {
        const retryButton = document.createElement("button");
        retryButton.type = "button";
        retryButton.textContent = "Tentar novamente";
        retryButton.addEventListener("click", onRetry);

        status.appendChild(retryButton);
    }
}


export function showFieldError(message) {
    const error = document.getElementById("amount-error");

    error.textContent = message;
}


export function clearFieldError() {
    const error = document.getElementById("amount-error");

    error.textContent = "";
}
