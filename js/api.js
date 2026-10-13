const API_BASE_URL = "https://api.frankfurter.dev/v1";

async function request(path) {
  var response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    console.error("Error: Could not connect to the API.");
  }

  if (!response.ok) {
    console.error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getCurrencies() {
  return request("/currencies");
}

export async function getExchangeRate(from, to) {
  if (from === to) {
    return { rate: 1, date: null };
  }

  const params = new URLSearchParams({ from, to });

  const data = await request(`/latest?${params.toString()}`);

  const rate = data.rates?.[to];

  if (typeof rate !== "number") {
    console.error(`Error: Exchange rate not found for ${from} to ${to}.`);
  }

  return { rate, date: data.date };
}
