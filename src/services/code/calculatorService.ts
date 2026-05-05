/**
 * Serviço simples de calculadora para o terminal.
 *
 * Segurança:
 * - aceita apenas números, espaços e operadores matemáticos básicos;
 * - não permite letras, funções JS ou código arbitrário.
 */

type ParsedCalculation =
  | {
      valid: true;
      expression: string;
    }
  | {
      valid: false;
      error: string;
    };

export function parseCalculation(input: string): ParsedCalculation {
  const expression = input.trim().replace(/,/g, ".");

  if (!expression) {
    return {
      valid: false,
      error: "Digite uma operação. Exemplo: 25 * 4 + 10",
    };
  }

  const allowedPattern = /^[0-9+\-*/().\s]+$/;

  if (!allowedPattern.test(expression)) {
    return {
      valid: false,
      error:
        "Operação inválida. Use apenas números e operadores: + - * / ( )",
    };
  }

  return {
    valid: true,
    expression,
  };
}

export function calculateExpression(expression: string) {
  try {
    /**
     * A expressão já foi validada antes.
     * Ainda assim, mantemos a função limitada ao cálculo matemático básico.
     */
    const result = Function(`"use strict"; return (${expression});`)();

    if (typeof result !== "number" || !Number.isFinite(result)) {
      throw new Error("Resultado inválido.");
    }

    return new Intl.NumberFormat("pt-BR", {
      maximumFractionDigits: 6,
    }).format(result);
  } catch {
    throw new Error("Não foi possível calcular essa expressão.");
  }
}