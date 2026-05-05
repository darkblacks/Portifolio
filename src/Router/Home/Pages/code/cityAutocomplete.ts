/**
 * Serviço de autocomplete de cidades brasileiras.
 *
 * Ele busca municípios pela API pública do IBGE quando o usuário informa a UF.
 * Exemplo de entrada:
 * SP - Santo An
 *
 * Saída sugerida:
 * SP - Santo André
 */

type IbgeCity = {
  id: number;
  nome: string;
};

type CitySuggestion = {
  uf: string;
  city: string;
  label: string;
};

/**
 * Cache em memória para evitar buscar a mesma UF toda hora.
 */
const cityCacheByUf = new Map<string, CitySuggestion[]>();

const VALID_UFS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

/**
 * Remove acentos e padroniza texto para comparação.
 */
function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

/**
 * Extrai UF e trecho da cidade a partir do input.
 *
 * Exemplo:
 * "SP - Santo An"
 * uf: "SP"
 * citySearch: "Santo An"
 */
function parsePartialLocation(input: string) {
  const parts = input.split("-").map((part) => part.trim());

  if (parts.length < 2) {
    return null;
  }

  const uf = parts[0].toUpperCase();
  const citySearch = parts.slice(1).join("-").trim();

  if (!VALID_UFS.includes(uf)) {
    return null;
  }

  return {
    uf,
    citySearch,
  };
}

/**
 * Busca todas as cidades de uma UF no IBGE.
 */
async function fetchCitiesByUf(uf: string) {
  const cachedCities = cityCacheByUf.get(uf);

  if (cachedCities) {
    return cachedCities;
  }

  const response = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar as cidades dessa UF.");
  }

  const data = (await response.json()) as IbgeCity[];

  const cities = data
    .map((city) => ({
      uf,
      city: city.nome,
      label: `${uf} - ${city.nome}`,
    }))
    .sort((a, b) => a.city.localeCompare(b.city, "pt-BR"));

  cityCacheByUf.set(uf, cities);

  return cities;
}

/**
 * Retorna a melhor sugestão de cidade.
 *
 * Regra:
 * 1. Se a cidade começa com o texto digitado, prioriza.
 * 2. Se contém o texto digitado, aceita também.
 * 3. Ordena alfabeticamente.
 */
export async function getCitySuggestion(input: string) {
  const parsed = parsePartialLocation(input);

  if (!parsed) return "";

  const { uf, citySearch } = parsed;

  if (!citySearch) return `${uf} - `;

  const cities = await fetchCitiesByUf(uf);

  const normalizedSearch = normalizeText(citySearch);

  const startsWithMatches = cities.filter((item) =>
    normalizeText(item.city).startsWith(normalizedSearch)
  );

  const containsMatches = cities.filter(
    (item) =>
      !normalizeText(item.city).startsWith(normalizedSearch) &&
      normalizeText(item.city).includes(normalizedSearch)
  );

  const bestMatch = [...startsWithMatches, ...containsMatches][0];

  return bestMatch?.label ?? "";
}