import { formatCurrency, formatRate, formatDate } from "./format.js";

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

    // Moedas iguais não têm data (date é null): nesse caso não mostramos a data
    const dateText = date ? ` (cotação de ${formatDate(date)})` : "";

    const message = document.createElement("p");
    message.textContent =
        `1 ${from} = ${formatRate(rate)} ${to}${dateText}`;

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

    const details = document.createElement("dl");

    addResultRow(details, "Valor informado", formatCurrency(amount, from));
    addResultRow(details, "Moeda de origem", from);
    addResultRow(details, "Moeda de destino", to);
    addResultRow(details, "Taxa de câmbio", `1 ${from} = ${formatRate(rate)} ${to}`);
    addResultRow(details, "Valor convertido", formatCurrency(convertedAmount, to));

    result.appendChild(title);
    result.appendChild(details);
}


// Cria um par "rótulo / valor" dentro da lista de descrição (<dl>)
function addResultRow(list, label, value) {
    const term = document.createElement("dt");
    term.textContent = label;

    const description = document.createElement("dd");
    description.textContent = value;

    list.appendChild(term);
    list.appendChild(description);
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
    const amountInput = document.getElementById("amount");

    error.textContent = message;
    amountInput.setAttribute("aria-invalid", "true");
}


export function clearFieldError() {
    const error = document.getElementById("amount-error");
    const amountInput = document.getElementById("amount");

    error.textContent = "";
    amountInput.removeAttribute("aria-invalid");
}
