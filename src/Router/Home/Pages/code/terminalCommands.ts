import {
  getWeatherForecastByLocation,
  parseWeatherLocation,
} from "../../../../services/code/weatherApi";

import { getDarkblacksGitHubOverview } from "../../../../services/code/githubApi";

import {
  calculateExpression,
  parseCalculation,
} from "../../../../services/code/calculatorService";

import {
  getCurrencyQuote,
  parseCurrencyInput,
} from "../../../../services/code/currencyApi";


/**
 * Lista oficial de comandos disponíveis no terminal.
 *
 * A ideia é usar comandos curtos e fáceis:
 * action1, action2, action3...
 */
export const AVAILABLE_COMMANDS = [
  "action1",
  "action2",
  "action3",
  "action4",
  "action5",
  "action6",
  "action7",
  "action8",
  "action9",
  "action10",
  "help",
  "cls",
  "cancel",
  "esc",
];

/**
 * Tipos de ações que ficam aguardando uma segunda resposta do usuário.
 */
export type TerminalAwaitingInput =
  | "birthday_date"
  | "weather_location"
  | "calculation"
  | "currency_quote"
  | null;
/**
 * Resultado retornado pelo terminal depois de executar um comando.
 */
export type TerminalCommandResult = {
  output: string[];
  effect?: string;
  effectPayload?: {
    message?: string;
  };
  awaitingInput?: TerminalAwaitingInput;
};

let pendingAction: TerminalAwaitingInput = null;

function padNumber(value: number) {
  return String(value).padStart(2, "0");
}

function calcularAniversario(dateText: string) {
  const partes = dateText.split("/");

  if (partes.length !== 3) {
    return {
      valid: false,
      error: "Formato inválido. Use DD/MM/AAAA. Exemplo: 03/07/2000.",
    };
  }

  const day = Number(partes[0]);
  const month = Number(partes[1]);
  const year = Number(partes[2]);

  if (!day || !month || !year) {
    return {
      valid: false,
      error: "Data inválida. Use apenas números no formato DD/MM/AAAA.",
    };
  }

  const birthDate = new Date(year, month - 1, day);

  const invalidDate =
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day;

  if (invalidDate) {
    return {
      valid: false,
      error: "Essa data não existe. Confira o dia, mês e ano digitados.",
    };
  }

  const today = new Date();

  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const currentYear = today.getFullYear();
  const birthdayThisYear = new Date(currentYear, month - 1, day);

  const isBirthday =
    today.getDate() === day && today.getMonth() === month - 1;

  let nextBirthday = birthdayThisYear;

  if (birthdayThisYear < todayOnly) {
    nextBirthday = new Date(currentYear + 1, month - 1, day);
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const daysLeft = Math.ceil(
    (nextBirthday.getTime() - todayOnly.getTime()) / millisecondsPerDay
  );

  const birthdayAlreadyHappenedThisYear = birthdayThisYear < todayOnly;

  const ageToday = birthdayAlreadyHappenedThisYear
    ? currentYear - year
    : currentYear - year - 1;

  const ageOnBirthday = currentYear - year;
  const nextAge = isBirthday ? ageOnBirthday : ageToday + 1;

  return {
    valid: true,
    isBirthday,
    daysLeft,
    ageToday,
    nextAge,
    formattedBirthday: `${padNumber(day)}/${padNumber(month)}/${year}`,
  };
}

function runBirthdayAction(command: string): TerminalCommandResult {
  const result = calcularAniversario(command);

  if (!result.valid) {
    pendingAction = "birthday_date";

    return {
      output: [
        result.error ?? "Data inválida.",
        "Digite novamente sua data de aniversário no formato DD/MM/AAAA.",
        "Digite 'cancel' ou pressione ESC para cancelar.",
      ],
      awaitingInput: "birthday_date",
    };
  }

  pendingAction = null;

  if (result.isBirthday) {
    return {
      output: [
        "🎂 Hoje é seu aniversário!",
        `🥳 Parabéns! Você está fazendo ${result.nextAge} anos hoje.`,
        "Preparando comemoração na tela...",
      ],
      effect: "birthday_success",
      effectPayload: {
        message: `Feliz aniversário! Hoje você faz ${result.nextAge} anos! 🎉`,
      },
      awaitingInput: null,
    };
  }

  return {
    output: [
      "Hoje ainda não é seu aniversário.",
      `Faltam ${result.daysLeft} dias para você fazer ${result.nextAge} anos.`,
    ],
    effect: "birthday_countdown",
    effectPayload: {
      message: `Hoje não é seu aniversário... faltam ${result.daysLeft} dias para você fazer ${result.nextAge} anos.`,
    },
    awaitingInput: null,
  };
}

function runHelpCommand(): TerminalCommandResult {
  return {
    output: [
      "Comandos disponíveis:",
      "",
      "action1      - Ação interativa de aniversário",
      "action2      - Rocket subindo devagar + BOOOOM",
      "action3      - Matrix de código",
      "action4      - Previsão do tempo por cidade",
      "action5      - Raio-X do GitHub darkblacks",
      "action6      - Calculadora",
      "action7      - Cotação de moedas",
      "action8      - Em breve",
      "action9      - Em breve",
      "action10     - Em breve",
      "",
      "help         - Mostra os comandos disponíveis",
      "cls          - Limpa o terminal",
      "cancel       - Cancela a ação atual",
      "esc          - Cancela a ação atual",
      "",
      "Dica: pressione TAB para completar comandos automaticamente.",
    ],
    awaitingInput: pendingAction,
  };
}

function runComingSoonAction(actionName: string): TerminalCommandResult {
  return {
    output: [
      `${actionName.toUpperCase()} ainda está em desenvolvimento.`,
      "Essa ação será adicionada nas próximas etapas do terminal.",
    ],
    awaitingInput: null,
  };
}

function runRocketAction(): TerminalCommandResult {
  pendingAction = null;

  return {
    output: [
      "AÇÃO 2 - ROCKET",
      "🚀 Lançamento iniciado.",
      "O foguete está subindo beeeem devagar...",
      "Aguarde o final da trajetória.",
      "BOOOOM programado para o final do voo.",
    ],
    effect: "rocket_slow",
    effectPayload: {
      message: "🚀 Subindo... beeeem devagarzinho...",
    },
    awaitingInput: null,
  };
}

function runMatrixAction(): TerminalCommandResult {
  pendingAction = null;

  return {
    output: [
      "AÇÃO 3 - MATRIX",
      "Inicializando chuva de código...",
      "React, API, SQL, TypeScript, 0 e 1 entrando na tela.",
    ],
    effect: "matrix_code",
    effectPayload: {
      message: "MATRIX MODE ATIVADO",
    },
    awaitingInput: null,
  };
}

function startWeatherAction(): TerminalCommandResult {
  pendingAction = "weather_location";

  return {
    output: [
      "AÇÃO 4 - PREVISÃO DO TEMPO",
      "Digite o local no formato: Estado - Cidade",
      "Exemplo: SP - Santo André",
      "Dica: comece digitando e pressione TAB para autocompletar a cidade.",
      "Digite 'cancel' ou pressione ESC para cancelar.",
    ],
    awaitingInput: "weather_location",
  };
}

async function runWeatherAction(
  command: string
): Promise<TerminalCommandResult> {
  const parsedLocation = parseWeatherLocation(command);

  if (!parsedLocation.valid) {
    pendingAction = "weather_location";

    return {
      output: [
        parsedLocation.error,
        "Digite novamente no formato: Estado - Cidade",
        "Exemplo: SP - Santo André",
        "Digite 'cancel' ou pressione ESC para cancelar.",
      ],
      awaitingInput: "weather_location",
    };
  }

  pendingAction = null;

  try {
    const forecastLines = await getWeatherForecastByLocation(
      parsedLocation.state,
      parsedLocation.city
    );

    return {
      output: ["Buscando previsão do tempo...", "", ...forecastLines],
      awaitingInput: null,
    };
  } catch (error) {
    return {
      output: [
        "Erro ao buscar previsão do tempo.",
        error instanceof Error
          ? error.message
          : "Tente novamente com outro estado/cidade.",
      ],
      awaitingInput: null,
    };
  }
}

async function runGitHubOverviewAction(): Promise<TerminalCommandResult> {
  pendingAction = null;

  try {
    const githubLines = await getDarkblacksGitHubOverview();

    return {
      output: [
        "AÇÃO 5 - RAIO-X GITHUB",
        "Buscando dados públicos de darkblacks...",
        "",
        ...githubLines,
      ],
      awaitingInput: null,
    };
  } catch (error) {
    return {
      output: [
        "Erro ao buscar dados do GitHub.",
        error instanceof Error
          ? error.message
          : "Tente novamente mais tarde.",
      ],
      awaitingInput: null,
    };
  }
}
/**
 * AÇÃO 6 - Primeira etapa.
 *
 * Pede uma operação matemática simples.
 */
function startCalculatorAction(): TerminalCommandResult {
  pendingAction = "calculation";

  return {
    output: [
      "AÇÃO 6 - CALCULADORA",
      "Digite uma operação matemática.",
      "Exemplo: 25 * 4 + 10",
      "Operadores aceitos: + - * / ( )",
      "Digite 'cancel' ou pressione ESC para cancelar.",
    ],
    awaitingInput: "calculation",
  };
}

/**
 * AÇÃO 6 - Segunda etapa.
 *
 * Calcula a expressão digitada pelo usuário.
 */
function runCalculatorAction(command: string): TerminalCommandResult {
  const parsedCalculation = parseCalculation(command);

  if (!parsedCalculation.valid) {
    pendingAction = "calculation";

    return {
      output: [
        parsedCalculation.error,
        "Digite novamente uma operação matemática.",
        "Exemplo: (100 + 50) / 3",
      ],
      awaitingInput: "calculation",
    };
  }

  pendingAction = null;

  try {
    const result = calculateExpression(parsedCalculation.expression);

    return {
      output: [
        "Resultado da calculadora:",
        `${parsedCalculation.expression} = ${result}`,
      ],
      awaitingInput: null,
    };
  } catch (error) {
    return {
      output: [
        "Erro ao calcular expressão.",
        error instanceof Error
          ? error.message
          : "Tente novamente com uma operação mais simples.",
      ],
      awaitingInput: null,
    };
  }
}

/**
 * AÇÃO 7 - Primeira etapa.
 *
 * Pede uma moeda para cotação.
 */
function startCurrencyAction(): TerminalCommandResult {
  pendingAction = "currency_quote";

  return {
    output: [
      "AÇÃO 7 - COTAÇÃO DE MOEDAS",
      "Digite uma moeda para cotar em BRL.",
      "Exemplo: USD",
      "Exemplo: EUR",
      "Exemplo: BTC",
      "Também aceita: USD-BRL",
      "Digite 'cancel' ou pressione ESC para cancelar.",
    ],
    awaitingInput: "currency_quote",
  };
}

/**
 * AÇÃO 7 - Segunda etapa.
 *
 * Consulta a cotação da moeda na API.
 */
async function runCurrencyAction(
  command: string
): Promise<TerminalCommandResult> {
  const parsedCurrency = parseCurrencyInput(command);

  if (!parsedCurrency.valid) {
    pendingAction = "currency_quote";

    return {
      output: [
        parsedCurrency.error,
        "Digite novamente uma moeda.",
        "Exemplo: USD, EUR, BTC.",
      ],
      awaitingInput: "currency_quote",
    };
  }

  pendingAction = null;

  try {
    const quoteLines = await getCurrencyQuote(
      parsedCurrency.pair,
      parsedCurrency.responseKey
    );

    return {
      output: ["Buscando cotação atualizada...", "", ...quoteLines],
      awaitingInput: null,
    };
  } catch (error) {
    return {
      output: [
        "Erro ao buscar cotação.",
        error instanceof Error
          ? error.message
          : "Tente novamente mais tarde.",
      ],
      awaitingInput: null,
    };
  }
}
export async function runTerminalCommand(
  command: string
): Promise<TerminalCommandResult> {
  const normalizedCommand = command.trim().toLowerCase();

  if (!normalizedCommand) {
    return {
      output: [],
      awaitingInput: pendingAction,
    };
  }

  if (normalizedCommand === "clear" || normalizedCommand === "cls") {
    pendingAction = null;

    return {
      output: [],
      effect: "clear",
      awaitingInput: null,
    };
  }

  if (normalizedCommand === "cancel" || normalizedCommand === "esc") {
    pendingAction = null;

    return {
      output: [
        "Ação cancelada.",
        "Digite 'help' para ver os comandos disponíveis.",
      ],
      awaitingInput: null,
    };
  }

  if (pendingAction === "birthday_date") {
    return runBirthdayAction(command.trim());
  }

  if (pendingAction === "weather_location") {
    return runWeatherAction(command.trim());
  }
if (pendingAction === "calculation") {
  return runCalculatorAction(command.trim());
}

if (pendingAction === "currency_quote") {
  return runCurrencyAction(command.trim());
}
  if (normalizedCommand === "help") {
    return runHelpCommand();
  }

  if (normalizedCommand === "action1") {
    pendingAction = "birthday_date";

    return {
      output: [
        "AÇÃO 1 - ANIVERSÁRIO",
        "Qual é a sua data de aniversário?",
        "Digite no formato DD/MM/AAAA. Exemplo: 03/07/2000",
        "Digite 'cancel' ou pressione ESC para cancelar.",
      ],
      awaitingInput: "birthday_date",
    };
  }

  if (normalizedCommand === "action2") {
    return runRocketAction();
  }

  if (normalizedCommand === "action3") {
    return runMatrixAction();
  }

  if (normalizedCommand === "action4") {
    return startWeatherAction();
  }

  if (normalizedCommand === "action5") {
    return runGitHubOverviewAction();
  }

if (normalizedCommand === "action6") {
  return startCalculatorAction();
}

if (normalizedCommand === "action7") {
  return startCurrencyAction();
}

  if (
    normalizedCommand === "action8" ||
    normalizedCommand === "action9" ||
    normalizedCommand === "action10"
  ) {
    return runComingSoonAction(normalizedCommand);
  }

  return {
    output: [
      `'${command}' não é reconhecido como um comando interno.`,
      "Digite 'help' para ver os comandos disponíveis.",
    ],
    awaitingInput: pendingAction,
  };
}