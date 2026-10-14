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
