const API_BASE_URL = "https://api.frankfurter.dev/v1";

async function request(path) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new Error(
      "Não foi possível conectar ao serviço de cotações. Verifique sua conexão.",
    );
  }

  // fetch NÃO lança erro para 404/422/500, por isso checamos response.ok
  if (!response.ok) {
    throw new Error(
      `O serviço de cotações respondeu com erro (${response.status}).`,
    );
  }

  return response.json();
}

export async function getCurrencies() {
  const data = await request("/currencies");

  return Object.entries(data).map(([code, name]) => ({ code, name }));
}

export async function getExchangeRate(from, to) {
  // A API responde 422 (bad currency pair) para moedas iguais
  if (from === to) {
    return { rate: 1, date: null };
  }

  const params = new URLSearchParams({ from, to });
  const data = await request(`/latest?${params.toString()}`);
  const rate = data.rates?.[to];

  if (typeof rate !== "number") {
    throw new Error("Cotação indisponível para as moedas selecionadas.");
  }

  return { rate, date: data.date };
}
