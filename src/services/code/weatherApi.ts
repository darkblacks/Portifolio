/**
 * Serviço responsável por buscar previsão do tempo.
 *
 * A API usada é a Open-Meteo:
 * - Geocoding API: transforma cidade/estado em latitude e longitude.
 * - Forecast API: busca clima atual e previsão diária.
 */

type GeocodingResult = {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
  timezone?: string;
};

type GeocodingResponse = {
  results?: GeocodingResult[];
};

type ForecastResponse = {
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    precipitation?: number;
    weather_code?: number;
    wind_speed_10m?: number;
  };
  daily?: {
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
  };
};

type ParsedWeatherLocation =
  | {
      valid: true;
      state: string;
      city: string;
    }
  | {
      valid: false;
      error: string;
    };

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function getStateName(state: string) {
  const states: Record<string, string> = {
    ac: "Acre",
    al: "Alagoas",
    ap: "Amapá",
    am: "Amazonas",
    ba: "Bahia",
    ce: "Ceará",
    df: "Distrito Federal",
    es: "Espírito Santo",
    go: "Goiás",
    ma: "Maranhão",
    mt: "Mato Grosso",
    ms: "Mato Grosso do Sul",
    mg: "Minas Gerais",
    pa: "Pará",
    pb: "Paraíba",
    pr: "Paraná",
    pe: "Pernambuco",
    pi: "Piauí",
    rj: "Rio de Janeiro",
    rn: "Rio Grande do Norte",
    rs: "Rio Grande do Sul",
    ro: "Rondônia",
    rr: "Roraima",
    sc: "Santa Catarina",
    sp: "São Paulo",
    se: "Sergipe",
    to: "Tocantins",
  };

  const normalized = normalizeText(state);

  return states[normalized] ?? state.trim();
}

function getWeatherDescription(code?: number) {
  const descriptions: Record<number, string> = {
    0: "Céu limpo",
    1: "Principalmente limpo",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Neblina",
    48: "Neblina com geada",
    51: "Garoa leve",
    53: "Garoa moderada",
    55: "Garoa forte",
    56: "Garoa congelante leve",
    57: "Garoa congelante forte",
    61: "Chuva fraca",
    63: "Chuva moderada",
    65: "Chuva forte",
    66: "Chuva congelante leve",
    67: "Chuva congelante forte",
    71: "Neve fraca",
    73: "Neve moderada",
    75: "Neve forte",
    77: "Grãos de neve",
    80: "Pancadas de chuva leves",
    81: "Pancadas de chuva moderadas",
    82: "Pancadas de chuva fortes",
    85: "Pancadas de neve leves",
    86: "Pancadas de neve fortes",
    95: "Trovoadas",
    96: "Trovoadas com granizo leve",
    99: "Trovoadas com granizo forte",
  };

  if (code === undefined) return "Não informado";

  return descriptions[code] ?? `Código climático ${code}`;
}

export function parseWeatherLocation(input: string): ParsedWeatherLocation {
  const parts = input.split("-").map((part) => part.trim());

  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return {
      valid: false,
      error:
        "Formato inválido. Use: Estado - Cidade. Exemplo: SP - Santo André.",
    };
  }

  return {
    valid: true,
    state: parts[0],
    city: parts[1],
  };
}

async function fetchGeocodingResults(searchQuery: string) {
  const geocodingUrl = new URL(
    "https://geocoding-api.open-meteo.com/v1/search"
  );

  geocodingUrl.searchParams.set("name", searchQuery);
  geocodingUrl.searchParams.set("count", "100");
  geocodingUrl.searchParams.set("language", "pt");
  geocodingUrl.searchParams.set("format", "json");
  geocodingUrl.searchParams.set("country_code", "BR");

  const geocodingResponse = await fetch(geocodingUrl.toString());

  if (!geocodingResponse.ok) {
    throw new Error("Não foi possível buscar a cidade informada.");
  }

  const geocodingData = (await geocodingResponse.json()) as GeocodingResponse;

  return geocodingData.results ?? [];
}

async function findLocation(stateInput: string, city: string) {
  const stateName = getStateName(stateInput);
  const normalizedState = normalizeText(stateName);
  const normalizedCity = normalizeText(city);

  /**
   * A Open-Meteo pode falhar quando buscamos cidade + estado juntos.
   * Por isso tentamos algumas variações.
   */
  const queries = [
    city,
    normalizeText(city),
    `${city}, ${stateName}`,
    `${normalizeText(city)}, ${normalizeText(stateName)}`,
    `${city} ${stateName}`,
  ];

  for (const query of queries) {
    const results = await fetchGeocodingResults(query);

    const exactStateAndCity = results.find((item) => {
      const itemCity = normalizeText(item.name);
      const itemState = normalizeText(item.admin1 ?? "");

      return itemCity === normalizedCity && itemState.includes(normalizedState);
    });

    if (exactStateAndCity) {
      return exactStateAndCity;
    }

    const exactCity = results.find((item) => {
      const itemCity = normalizeText(item.name);
      return itemCity === normalizedCity;
    });

    if (exactCity) {
      return exactCity;
    }

    const startsWithCity = results.find((item) => {
      const itemCity = normalizeText(item.name);
      return itemCity.startsWith(normalizedCity);
    });

    if (startsWithCity) {
      return startsWithCity;
    }
  }

  throw new Error(
    "Cidade não encontrada. Confira o estado e a cidade digitados."
  );
}

export async function getWeatherForecastByLocation(
  stateInput: string,
  city: string
) {
  const stateName = getStateName(stateInput);
  const location = await findLocation(stateInput, city);

  const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");

  forecastUrl.searchParams.set("latitude", String(location.latitude));
  forecastUrl.searchParams.set("longitude", String(location.longitude));

  forecastUrl.searchParams.set(
    "current",
    [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ].join(",")
  );

  forecastUrl.searchParams.set(
    "daily",
    [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
    ].join(",")
  );

  forecastUrl.searchParams.set("timezone", "auto");
  forecastUrl.searchParams.set("forecast_days", "1");

  const forecastResponse = await fetch(forecastUrl.toString());

  if (!forecastResponse.ok) {
    throw new Error("Não foi possível buscar a previsão do tempo.");
  }

  const forecastData = (await forecastResponse.json()) as ForecastResponse;

  const current = forecastData.current;
  const daily = forecastData.daily;

  if (!current) {
    throw new Error("A API não retornou dados atuais de clima.");
  }

  return [
    `${location.name} - ${location.admin1 ?? stateName}`,
    `Condição atual: ${getWeatherDescription(current.weather_code)}`,
    `Temperatura atual: ${current.temperature_2m ?? "N/I"}°C`,
    `Umidade: ${current.relative_humidity_2m ?? "N/I"}%`,
    `Vento: ${current.wind_speed_10m ?? "N/I"} km/h`,
    `Chuva agora: ${current.precipitation ?? "N/I"} mm`,
    `Máxima hoje: ${daily?.temperature_2m_max?.[0] ?? "N/I"}°C`,
    `Mínima hoje: ${daily?.temperature_2m_min?.[0] ?? "N/I"}°C`,
    `Chance máxima de chuva hoje: ${
      daily?.precipitation_probability_max?.[0] ?? "N/I"
    }%`,
  ];
}