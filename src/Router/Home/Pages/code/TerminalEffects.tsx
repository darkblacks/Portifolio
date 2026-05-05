import { useEffect, useState } from "react";

/**
 * Representa um efeito visual ativo na tela.
 */
type EffectItem = {
  id: number;
  effect: string;
  message?: string;
};

export default function TerminalEffects() {
  const [effects, setEffects] = useState<EffectItem[]>([]);

  useEffect(() => {
    /**
     * Escuta eventos enviados pelo terminal.
     *
     * O componente Code.tsx dispara o evento "terminal-effect".
     * Este componente recebe o nome do efeito e renderiza a animação correta.
     */
    function handleEffect(event: Event) {
      const customEvent = event as CustomEvent<{
        effect: string;
        message?: string;
      }>;

      const { effect, message } = customEvent.detail;

      if (effect === "clear") return;

      const id = Date.now();

      setEffects((currentEffects) => [
        ...currentEffects,
        {
          id,
          effect,
          message,
        },
      ]);

      /**
       * AÇÃO 2 precisa de mais tempo porque:
       * - o foguete sobe devagar;
       * - a explosão acontece no final;
       * - depois ainda existe o fade da explosão.
       */
      const duration =
  effect === "rocket_slow" ? 12000 :
  effect === "matrix_code" ? 6200 :
  4300;

      setTimeout(() => {
        setEffects((currentEffects) =>
          currentEffects.filter((item) => item.id !== id)
        );
      }, duration);
    }

    document.addEventListener("terminal-effect", handleEffect);

    return () => {
      document.removeEventListener("terminal-effect", handleEffect);
    };
  }, []);

  return (
    <div className="terminal-effects-layer">
      {effects.map((item) => {
        /**
         * AÇÃO 1 - Aniversário confirmado.
         */
        if (item.effect === "birthday_success") {
          return (
            <div key={item.id} className="birthday-effect birthday-success">
              <div className="birthday-message">{item.message}</div>

              {[
                "🎈",
                "🎉",
                "🎂",
                "✨",
                "🎁",
                "🥳",
                "🎊",
                "🎆",
                "🎇",
                "💜",
                "🚀",
                "⭐",
              ].map((emoji, index) => (
                <span
                  key={`${emoji}-${index}`}
                  style={{ "--i": index } as React.CSSProperties}
                >
                  {emoji}
                </span>
              ))}
            </div>
          );
        }

        /**
         * AÇÃO 1 - Contagem regressiva.
         */
        if (item.effect === "birthday_countdown") {
          return (
            <div key={item.id} className="birthday-countdown-effect">
              <div className="birthday-countdown-message">{item.message}</div>
            </div>
          );
        }

        /**
         * AÇÃO 2 - Rocket.
         *
         * Tudo é controlado por CSS:
         * - foguete sobe;
         * - fumaça acompanha;
         * - foguete some;
         * - explosão aparece no final.
         */
        if (item.effect === "rocket_slow") {
          return (
            <div key={item.id} className="rocket-action">
              <div className="rocket-message">{item.message}</div>

              <div className="rocket-flight">
                <span className="rocket-smoke rocket-smoke-one">💨</span>
                <span className="rocket-smoke rocket-smoke-two">💨</span>
                <span className="rocket-smoke rocket-smoke-three">💨</span>

                <span className="rocket-emoji">🚀</span>
              </div>

              <div className="rocket-final-boom">
                <div className="rocket-flash" />
                <div className="rocket-boom-emoji">💥</div>
                <div className="rocket-boom-ring rocket-ring-one" />
                <div className="rocket-boom-ring rocket-ring-two" />
                <div className="rocket-boom-ring rocket-ring-three" />

                <span className="rocket-particle rocket-particle-one">✨</span>
                <span className="rocket-particle rocket-particle-two">🔥</span>
                <span className="rocket-particle rocket-particle-three">⭐</span>
                <span className="rocket-particle rocket-particle-four">💫</span>

                <div className="rocket-boom-text">BOOOOM!</div>
              </div>
            </div>
          );
        }
/**
 * AÇÃO 3 - Matrix.
 *
 * Sobe códigos, números e palavras técnicas na tela.
 */
if (item.effect === "matrix_code") {
  const matrixItems = [
    "0", "1", "0", "1", "0", "1", "0", "1", "0", "1",
    "0101", "1010", "0011", "1100", "0110", "1001",
    "0", "1", "0", "1", "0", "1", "0", "1",
    "React", "API", "SQL", "JS", "TS",
    "useState()", "fetch()", "{ data }", "async", "await",
    "node", "props", "JSON", "</>",
    "0", "1", "0", "1", "0", "1", "0", "1",
    "001", "111", "000", "101", "010", "110",
    "0", "1", "0", "1", "0", "1", "0", "1",
    "SELECT *", "POST /api", "return", "const", "function()",
    "0", "1", "0", "1", "0", "1", "0", "1",
  ];

  return (
    <div key={item.id} className="matrix-effect">
      <div className="matrix-message">{item.message}</div>

      {matrixItems.map((text, index) => (
        <span
          key={`${text}-${index}`}
          className="matrix-token"
          style={{ "--i": index } as React.CSSProperties}
        >
          {text}
        </span>
      ))}
    </div>
  );
}
        return null;
      })}
    </div>
  );
}