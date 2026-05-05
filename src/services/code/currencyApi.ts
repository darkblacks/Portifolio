/**
 * Serviço responsável por buscar cotação de moedas.
 *
 * API usada:
 * AwesomeAPI - API de Cotações
 *
 * Exemplos aceitos no terminal:
 * - USD
 * - EUR
 * - BTC
 * - USD-BRL
 */

type CurrencyResponseItem = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

type CurrencyApiResponse = Record<string, CurrencyResponseItem>;

type ParsedCurrency =
  | {
      valid: true;
      pair: string;
      responseKey: string;
    }
  | {
      valid: false;
      error: string;
    };

const SUPPORTED_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "ARS",
  "CAD",
  "AUD",
  "JPY",
  "CHF",
  "CNY",
  "BTC",
  "ETH",
];

function formatBRL(value: string) {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return "N/I";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 4,
  }).format(numberValue);
}

function formatPercent(value: string) {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return "N/I";
  }

  return `${numberValue.toFixed(2).replace(".", ",")}%`;
}

export function parseCurrencyInput(input: string): ParsedCurrency {
  const raw = input.trim().toUpperCase();

  if (!raw) {
    return {
      valid: false,
      error: "Digite uma moeda. Exemplo: USD, EUR, BTC ou USD-BRL.",
    };
  }

  const normalized = raw.includes("-") ? raw : `${raw}-BRL`;

  const [from, to] = normalized.split("-");

  if (!from || !to) {
    return {
      valid: false,
      error: "Formato inválido. Use: USD ou USD-BRL.",
    };
  }

  if (to !== "BRL") {
    return {
      valid: false,
      error: "Por enquanto, a cotação está configurada somente contra BRL.",
    };
  }

  if (!SUPPORTED_CURRENCIES.includes(from)) {
    return {
      valid: false,
      error: `Moeda não suportada ainda. Use: ${SUPPORTED_CURRENCIES.join(
        ", "
      )}`,
    };
  }

  return {
    valid: true,
    pair: `${from}-BRL`,
    responseKey: `${from}BRL`,
  };
}

export async function getCurrencyQuote(pair: string, responseKey: string) {
  const url = `https://economia.awesomeapi.com.br/json/last/${pair}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Não foi possível buscar a cotação dessa moeda.");
  }

  const data = (await response.json()) as CurrencyApiResponse;

  const quote = data[responseKey];

  if (!quote) {
    throw new Error("A API não retornou dados para essa moeda.");
  }

  return [
    `${quote.name}`,
    `Compra: ${formatBRL(quote.bid)}`,
    `Venda: ${formatBRL(quote.ask)}`,
    `Máxima: ${formatBRL(quote.high)}`,
    `Mínima: ${formatBRL(quote.low)}`,
    `Variação: ${formatBRL(quote.varBid)}`,
    `Variação percentual: ${formatPercent(quote.pctChange)}`,
    `Atualizado em: ${quote.create_date}`,
  ];
}