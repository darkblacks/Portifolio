import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AVAILABLE_COMMANDS,
  runTerminalCommand,
  type TerminalAwaitingInput,
} from "./code/terminalCommands";
import TerminalEffects from "./code/TerminalEffects";
import { getCitySuggestion } from "./code/cityAutocomplete";

type TerminalLine = {
  type: "command" | "output";
  text: string;
};

const INITIAL_LINES: TerminalLine[] = [
  { type: "output", text: "Microsoft Windows [versão 10.0.19045.4046]" },
  {
    type: "output",
    text: "(c) Microsoft Corporation. Todos os direitos reservados.",
  },
  { type: "output", text: "" },
  { type: "output", text: "Terminal interativo do portfólio de Victor." },
  {
    type: "output",
    text: "Digite 'help' para ver os comandos disponíveis.",
  },
];

export default function Code() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);

  /**
   * Controla quando o terminal está esperando uma segunda informação.
   *
   * Exemplos:
   * - action1 espera uma data de aniversário.
   * - action4 espera "Estado - Cidade" para buscar previsão do tempo.
   */
  const [awaitingInput, setAwaitingInput] =
    useState<TerminalAwaitingInput>(null);

  /**
   * Histórico de comandos digitados.
   *
   * Permite navegar no terminal como no CMD:
   * - ArrowUp: comando anterior.
   * - ArrowDown: próximo comando.
   */
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  /**
   * Sugestão assíncrona usada na AÇÃO 4.
   *
   * Exemplo:
   * usuário digita "SP - Santo An"
   * sugestão vira "SP - Santo André".
   */
  const [asyncSuggestion, setAsyncSuggestion] = useState("");

  /**
   * Busca sugestão de cidade quando a AÇÃO 4 estiver aguardando local.
   *
   * Essa busca fica separada porque depende de API/lista externa de cidades.
   */
  useEffect(() => {
    let cancelled = false;

    async function loadSuggestion() {
      if (awaitingInput !== "weather_location") {
        setAsyncSuggestion("");
        return;
      }

      const suggestion = await getCitySuggestion(input);

      if (!cancelled) {
        setAsyncSuggestion(suggestion);
      }
    }

    loadSuggestion();

    return () => {
      cancelled = true;
    };
  }, [input, awaitingInput]);

  /**
   * Dispara efeitos visuais globais do terminal.
   *
   * O TerminalEffects escuta o evento "terminal-effect" e renderiza
   * animações como aniversário, rocket, matrix etc.
   */
  function triggerEffect(effect?: string, effectPayload?: { message?: string }) {
    if (!effect) return;

    document.dispatchEvent(
      new CustomEvent("terminal-effect", {
        detail: {
          effect,
          ...effectPayload,
        },
      })
    );
  }

  /**
   * Retorna a sugestão principal do terminal.
   *
   * Para comandos normais:
   * - action1, action2, help, cls...
   *
   * Para action1:
   * - DD/MM/AAAA.
   *
   * Para action4:
   * - UF - Cidade ou sugestão real de cidade.
   */
  function getCommandSuggestion() {
    const typed = input.trim().toLowerCase();

    if (awaitingInput === "birthday_date") {
      return "DD/MM/AAAA";
    }

    if (awaitingInput === "weather_location") {
      return asyncSuggestion || "UF - Cidade";
    }

    if (!typed) {
      return "action1";
    }

    return (
      AVAILABLE_COMMANDS.find((command) => command.startsWith(typed)) ?? ""
    );
  }

  /**
   * Retorna apenas a parte "fantasma" da sugestão.
   *
   * Exemplo:
   * input: ac
   * sugestão: action1
   * ghost: tion1
   *
   * Exemplo action4:
   * input: SP - Santo An
   * sugestão: SP - Santo André
   * ghost: dré
   */
  function getGhostCompletion() {
    const suggestion = getCommandSuggestion();

    if (!suggestion) return "";

    if (awaitingInput === "birthday_date") {
      return suggestion.slice(input.length);
    }

    if (awaitingInput === "weather_location") {
      if (!input) return suggestion;

      const normalizedSuggestion = suggestion.toLowerCase();
      const normalizedInput = input.toLowerCase();

      if (!normalizedSuggestion.startsWith(normalizedInput)) {
        return "";
      }

      return suggestion.slice(input.length);
    }

    if (!input) {
      return suggestion;
    }

    if (suggestion.toLowerCase() === input.toLowerCase()) {
      return "";
    }

    if (!suggestion.toLowerCase().startsWith(input.toLowerCase())) {
      return "";
    }

    return suggestion.slice(input.length);
  }

  /**
   * Atualiza o input do terminal.
   *
   * Na action1, aplica máscara de data:
   * - aceita apenas números;
   * - coloca "/" automaticamente;
   * - limita em 8 números.
   *
   * Nas demais ações, deixa o usuário digitar normalmente.
   */
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    /**
     * Se o usuário digitar manualmente após navegar no histórico,
     * saímos do modo de navegação.
     */
    setHistoryIndex(null);

    if (awaitingInput === "birthday_date") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 8);

      let formattedDate = onlyNumbers;

      if (onlyNumbers.length >= 2) {
        formattedDate = `${onlyNumbers.slice(0, 2)}/`;
      }

      if (onlyNumbers.length > 2) {
        formattedDate = `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(2, 4)}`;
      }

      if (onlyNumbers.length >= 4) {
        formattedDate = `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(
          2,
          4
        )}/`;
      }

      if (onlyNumbers.length > 4) {
        formattedDate = `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(
          2,
          4
        )}/${onlyNumbers.slice(4, 8)}`;
      }

      setInput(formattedDate);
      return;
    }

    setInput(value);
  }

  /**
   * Controla atalhos do input.
   *
   * TAB:
   * - completa comandos;
   * - completa cidade na action4.
   *
   * ESC:
   * - cancela ação atual.
   *
   * ArrowUp:
   * - comando anterior do histórico.
   *
   * ArrowDown:
   * - próximo comando do histórico.
   */
  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();

      Promise.resolve(runTerminalCommand("esc")).then((result) => {
        setLines((currentLines) => [
          ...currentLines,
          { type: "command", text: "C:\\Users\\Victor><ESC>" },
          ...result.output.map((text) => ({
            type: "output" as const,
            text,
          })),
        ]);

        setInput("");
        setAwaitingInput(null);
        setHistoryIndex(null);
        triggerEffect(result.effect, result.effectPayload);
      });

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (commandHistory.length === 0) return;

      const nextIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(historyIndex - 1, 0);

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (commandHistory.length === 0 || historyIndex === null) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInput("");
        return;
      }

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
      return;
    }

    if (event.key !== "Tab") return;
if (awaitingInput === "calculation") return;
if (awaitingInput === "currency_quote") return;
    /**
     * Na data de aniversário, não usamos TAB.
     * O usuário precisa digitar a data.
     */
    if (awaitingInput === "birthday_date") return;

    /**
     * Na previsão do tempo, TAB completa a cidade sugerida.
     */
    if (awaitingInput === "weather_location") {
      const suggestion = getCommandSuggestion();

      if (!suggestion || suggestion === "UF - Cidade") return;

      event.preventDefault();
      setInput(suggestion);
      return;
    }

    /**
     * Autocomplete normal de comandos.
     */
    const suggestion = getCommandSuggestion();
if (awaitingInput === "calculation") {
  return input ? "" : "25 * 4 + 10";
}

if (awaitingInput === "currency_quote") {
  return input ? "" : "USD";
}
    if (!suggestion) return;

    event.preventDefault();
    setInput(suggestion);
  }

  /**
   * Processa o comando digitado pelo usuário.
   *
   * Fluxo:
   * 1. Impede reload do formulário.
   * 2. Salva o comando no histórico.
   * 3. Executa runTerminalCommand.
   * 4. Atualiza linhas do CMD.
   * 5. Atualiza estado de ação pendente.
   * 6. Dispara efeito visual, se existir.
   */
  async function handleCommand(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const typedCommand = input.trim();

    if (!typedCommand) return;

    setCommandHistory((currentHistory) => {
      const lastCommand = currentHistory[currentHistory.length - 1];

      if (lastCommand === typedCommand) {
        return currentHistory;
      }

      return [...currentHistory, typedCommand];
    });

    setHistoryIndex(null);

    const result = await Promise.resolve(runTerminalCommand(typedCommand));

    if (result.effect === "clear") {
      setLines(INITIAL_LINES);
      setInput("");
      setAwaitingInput(null);
      setAsyncSuggestion("");
      return;
    }

    setLines((currentLines) => [
      ...currentLines,
      { type: "command", text: `C:\\Users\\Victor>${typedCommand}` },
      ...result.output.map((text) => ({
        type: "output" as const,
        text,
      })),
    ]);

    setAwaitingInput(result.awaitingInput ?? null);
    triggerEffect(result.effect, result.effectPayload);
    setInput("");
  }

  const ghostCompletion = getGhostCompletion();

  return (
    <section className="section code-section" id="code">
      <TerminalEffects />

      {/* 
        Introdução da seção.
        Explica ao visitante o motivo do terminal existir no portfólio.
      */}
      <motion.div
        className="code-intro"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="code-kicker">Terminal interativo</span>

        <h2>Conhecimento aplicado em código</h2>

        <p>
          Este terminal simula uma experiência de linha de comando dentro do
          navegador. Ele foi criado para demonstrar conhecimentos em React,
          controle de estado, consumo de API, lógica de programação e criação de
          interfaces interativas.
        </p>
      </motion.div>

      {/* 
        Janela principal do terminal.
      */}
      <motion.div
        className="cmd-window"
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
      >
        <div className="cmd-titlebar">
          <span className="cmd-title">C:\Windows\System32\cmd.exe</span>

          <div className="cmd-actions">
            <span>─</span>
            <span>□</span>
            <span>×</span>
          </div>
        </div>

        <div className="cmd-body">
          {lines.map((line, index) => (
            <p
              key={`${line.text}-${index}`}
              className={line.type === "command" ? "cmd-command" : ""}
            >
              {line.text}
            </p>
          ))}

          <form onSubmit={handleCommand} className="cmd-input-line">
            <span className="cmd-path">C:\Users\Victor&gt;</span>

            <div className="cmd-autocomplete">
              <span className="cmd-ghost-text" aria-hidden="true">
                <span className="cmd-ghost-spacer">{input}</span>
                {ghostCompletion}
              </span>

              <input
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                aria-label="Digite um comando no terminal"
              />
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}