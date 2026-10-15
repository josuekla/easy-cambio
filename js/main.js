import { getCurrencies, getExchangeRate } from "./api.js";
import { parseAmount } from "./format.js";
import {
  renderCurrencyOptions,
  renderQuote,
  clearQuote,
  renderResult,
  clearResult,
  showLoading,
  clearStatus,
  showError,
  showFieldError,
  clearFieldError,
} from "./ui.js";

const DEFAULT_FROM_CURRENCY = "USD";
const DEFAULT_TO_CURRENCY = "BRL";

const form = document.getElementById("conversion-form");
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");

const swapButton = document.getElementById("swap-button");
const convertButton = document.getElementById("convert-button");

function setControlsDisabled(disabled) {
  amountInput.disabled = disabled;
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
    showError(error.message, loadCurrencies);
  }
}

// Busca a cotação; se amount for um número, também mostra a conversão
async function refresh(amount) {
  const from = fromSelect.value;
  const to = toSelect.value;

  // Placeholder selecionado: não há o que consultar
  if (!from || !to) {
    clearQuote();
    clearResult();
    clearStatus();
    return;
  }

  // Trava os controles até a resposta chegar, para não haver duas buscas ao mesmo tempo
  setControlsDisabled(true);
  showLoading("Carregando cotação...");

  try {
    const { rate, date } = await getExchangeRate(from, to);

    clearStatus();
    renderQuote(from, to, rate, date);

    if (amount === null) {
      clearResult();
    } else {
      renderResult({ amount, from, to, rate, convertedAmount: amount * rate });
    }
  } catch (error) {
    clearQuote();
    clearResult();
    showError(error.message);
  } finally {
    // Roda sempre, com sucesso ou erro: libera os controles de novo
    setControlsDisabled(false);
  }
}

function handleSubmit(event) {
  event.preventDefault(); // Evita o envio do formulário

  const amount = parseAmount(amountInput.value);

  if (amount === null) {
    clearResult();
    showFieldError("Informe um valor numérico maior que zero.");
    amountInput.focus();
    return;
  }

  clearFieldError();
  refresh(amount);
}

// Ao trocar a moeda: atualiza a cotação e reconverte se já houver valor válido
function handleCurrencyChange() {
  refresh(parseAmount(amountInput.value));
}

function handleSwap() {
  [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
  refresh(parseAmount(amountInput.value));
}

form.addEventListener("submit", handleSubmit);
fromSelect.addEventListener("change", handleCurrencyChange);
toSelect.addEventListener("change", handleCurrencyChange);
swapButton.addEventListener("click", handleSwap);

loadCurrencies();
