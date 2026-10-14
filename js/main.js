import { getCurrencies, getExchangeRate } from "./api";
import { parseAmount } from "./format";
import {
  renderCurrencyOptions,
  renderQuote,
  clearQuote,
  renderResult,
  showLoading,
} from "./ui";

const DEFAULT_FROM_CURRENCY = "USD";
const DEFAULT_TO_CURRENCY = "BRL";

const form = document.getElementById("exchange-form");
const amoutInput = document.getElementById("amount");
const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");

const swapButton = document.getElementById("swap-button");
const convertButton = document.getElementById("convert-button");

var lastRequestId = 0;

function setControlsDisabled(disabled) {
  amoutInput.disabled = disabled;
  fromSelect.disabled = disabled;
  toSelect.disabled = disabled;
  swapButton.disabled = disabled;
  convertButton.disabled = disabled;
}

// Carregamento das moedas disponíveis

async function loadCurrencies() {
  setControlsDisabled(true);

  showLoading("Carregando moedas...");

  try {
    const currencies = await getCurrencies();
    renderCurrencyOptions(currencies);
    fromSelect.value = DEFAULT_FROM_CURRENCY;
    toSelect.value = DEFAULT_TO_CURRENCY;
    setControlsDisabled(false);

    await refresh(null);
  } catch (error) {
    console.error("Error loading currencies:", error);
  }
}

async function refresh(amount) {
  const from = fromSelect.value;
  const to = toSelect.value;

  const requestId = ++lastRequestId;

  convertButton.disabled = true;
  showLoading("Carregando cotação...");

  try {
    const { rate, date } = await getExchangeRate(from, to);

    // Se a requisição não for a mais recente, não atualiza a cotação
    if (requestId !== lastRequestId) {
      return;
    }

    clearQuote();
    renderQuote(rate, date);

    if (amount !== null) {
      clearResult();
    } else {
      renderResult({ amount, from, to, rate, convertedAmount: amount * rate });
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  } finally {
    convertButton.disabled = false;
  }
}

function handleSubmit(event) {
  event.preventDefault(); // Evita o envio do formulário

  const amount = parseAmount(amountInput.value);

  if (amount === null) {
    alert("Por favor, insira um valor válido.");
    return;
    clearResult();
    amountInput.focus();
  }

  clearFields();
  refresh(amount);
}

function handleCurrencyChange() {
  refresh(paseAmount(amountInput.value));
}

function handleSwap() {
  [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
  refresh(parseAmount(amountInput.value));
}
