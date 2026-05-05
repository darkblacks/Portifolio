import { motion } from "framer-motion";
import {
  SiArduino,
  SiC,
  SiCplusplus,
  SiCss,
  SiHtml5,
  SiJavascript,
  SiMariadb,
  SiNestjs,
  SiPandas,
  SiPython,
  SiReact,
  SiKotlin,
} from "react-icons/si";
import {
  FaDatabase,
  FaFileExcel,
  FaJava,
  FaMobileAlt,
} from "react-icons/fa";
import { TbBrandReactNative, TbWorldWww } from "react-icons/tb";
import { BsBarChartFill } from "react-icons/bs";

const skillGroups = [
  {
    title: "Linguagens",
    description: "Base de lógica, desenvolvimento web, mobile e automação.",
    items: [
      {
        name: "Python",
        icon: SiPython,
        color: "#38bdf8",
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        color: "#facc15",
      },
    ],
  },
  {
    title: "Minhas skills",
    description: "Construção de interfaces, sistemas web e aplicações mobile.",
    items: [
      {
        name: "Web",
        icon: TbWorldWww,
        color: "#22d3ee",
      },
      {
        name: "Mobile App",
        icon: FaMobileAlt,
        color: "#a78bfa",
      },
      {
        name: "React",
        icon: SiReact,
        color: "#61dafb",
      },
      {
        name: "NestJS",
        icon: SiNestjs,
        color: "#ef4444",
      },
      {
        name: "React Native",
        icon: TbBrandReactNative,
        color: "#60a5fa",
      },
            {
        name: "HTML",
        icon: SiHtml5,
        color: "#f97316",
      },
      {
        name: "CSS",
        icon: SiCss,
        color: "#38bdf8",
      },
    ],
  },
  {
    title: "Análise de dados",
    description: "Tratamento, leitura e manipulação de dados com código.",
    items: [
      {
        name: "Python",
        icon: SiPython,
        color: "#38bdf8",
      },
      {
        name: "Pandas",
        icon: SiPandas,
        color: "#a78bfa",
      },
    ],
  },
  {
    title: "Análise simplificada",
    description: "Ferramentas visuais para tratamento, modelagem e dashboards.",
    items: [
      {
        name: "Excel",
        icon: FaFileExcel,
        color: "#22c55e",
      },
      {
        name: "Power Query",
        icon: BsBarChartFill,
        color: "#38bdf8",
      },
        {
        name: "Power BI",
        icon: BsBarChartFill,
        color: "#facc15",
        },
            ],
  },
  {
    title: "Banco de dados",
    description:
      "Consulta, estruturação e persistência de dados em projetos reais.",
    items: [
      {
        name: "SQL",
        icon: FaDatabase,
        color: "#c084fc",
      },
      {
        name: "MariaDB",
        icon: SiMariadb,
        color: "#60a5fa",
      },
      {
        name: "NoSQL",
        icon: FaDatabase,
        color: "#22d3ee",
      },
    ],
  },
  {
    title: "Já utilizei na prática",
    description:
      "Tecnologias que já explorei em estudos, testes ou protótipos, mesmo sem finalizar projetos completos.",
    items: [
      {
        name: "C++",
        icon: SiCplusplus,
        color: "#60a5fa",
      },
      {
        name: "Arduino",
        icon: SiArduino,
        color: "#22d3ee",
      },
      {
        name: "Java",
        icon: FaJava,
        color: "#f97316",
      },
      {
        name: "C",
        icon: SiC,
        color: "#a78bfa",
      },
      {
  name: "Kotlin",
  icon: SiKotlin,
  color: "#a78bfa",
},
    ],
  },
];

export default function Programador() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        maxWidth: 1180,
        margin: "0 auto",
      }}
    >
      {/* SEÇÃO 1 - HISTÓRIA COM PROGRAMAÇÃO */}
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          display: "grid",
          gridTemplateColumns: "0.95fr 1.05fr",
          gap: 28,
          alignItems: "center",
          padding: 30,
          borderRadius: 32,
          border: "1px solid rgba(192, 132, 252, 0.22)",
          background:
            "linear-gradient(145deg, rgba(139, 92, 246, 0.16), rgba(255, 255, 255, 0.035)), rgba(12, 10, 24, 0.9)",
          boxShadow: "0 26px 80px rgba(0, 0, 0, 0.32)",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.025 }}
          style={{
            minHeight: 320,
            display: "grid",
            placeItems: "center",
            borderRadius: 28,
            background:
              "radial-gradient(circle at 50% 45%, rgba(139, 92, 246, 0.2), rgba(255, 255, 255, 0.045))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
            padding: 22,
          }}
        >
          <img
            src="/programacao.png"
            alt="Programação e desenvolvimento"
            style={{
              width: "min(450px, 94%)",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </motion.div>

        <div>
          <span
            style={{
              display: "inline-block",
              marginBottom: 14,
              color: "#c084fc",
              fontSize: "0.78rem",
              fontWeight: 900,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Desenvolvimento
          </span>

          <h3
            style={{
              margin: "0 0 18px",
              color: "#ffffff",
              fontSize: "clamp(1.8rem, 3vw, 2.7rem)",
              lineHeight: 1.1,
            }}
          >
            Da curiosidade em Python à criação de soluções reais
          </h3>

          <p
            style={{
              margin: "0 0 18px",
              color: "rgba(255, 255, 255, 0.74)",
              fontSize: "1rem",
              lineHeight: 1.85,
            }}
          >
            Minha relação com programação começou na maioridade, quando fiz meu
            primeiro curso de Python no Curso em Vídeo, com Gustavo Guanabara aos 18 anos, atualmente tenho: .
            Foi ali que tive meu primeiro contato mais estruturado com lógica de
            programação, sintaxe, resolução de problemas e a sensação de criar
            algo funcional a partir de código.
          </p>

          <p
            style={{
              margin: "0 0 18px",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "0.98rem",
              lineHeight: 1.8,
            }}
          >
            Apesar desse início, foi na equipe da Generation que comecei a viver
            situações mais próximas do mercado. O bootcamp tinha foco em
            aprendizado prático, projetos em grupo, desafios reais e construção
            de soluções com organização, responsabilidade e colaboração.
          </p>

          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.66)",
              fontSize: "0.98rem",
              lineHeight: 1.8,
            }}
          >
            Nesse processo, aprimorei habilidades que já conhecia e descobri
            novas ferramentas, entendendo melhor como programação, dados,
            backend, frontend e experiência do usuário se conectam dentro de um
            projeto completo.
          </p>
        </div>
      </motion.section>

      {/* SEÇÃO 2 - SKILLS */}
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.22 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          marginTop: 26,
          padding: 30,
          borderRadius: 32,
          border: "1px solid rgba(34, 211, 238, 0.16)",
          background:
            "linear-gradient(145deg, rgba(34, 211, 238, 0.08), rgba(139, 92, 246, 0.12)), rgba(8, 13, 24, 0.9)",
          boxShadow: "0 26px 80px rgba(0, 0, 0, 0.32)",
        }}
      >
        <div
          style={{
            maxWidth: 820,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              display: "inline-block",
              marginBottom: 14,
              color: "#67e8f9",
              fontSize: "0.78rem",
              fontWeight: 900,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Stack e habilidades
          </span>

          <h3
            style={{
              margin: "0 0 16px",
              color: "#ffffff",
              fontSize: "clamp(1.8rem, 3vw, 2.55rem)",
              lineHeight: 1.1,
            }}
          >
            Tecnologias que uso para transformar ideias em projetos
          </h3>

          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "1rem",
              lineHeight: 1.8,
            }}
          >
            Minha base técnica combina programação, análise de dados,
            construção de interfaces, backend, mobile e bancos de dados. Gosto
            de aprender aplicando: criando telas, conectando APIs, tratando
            dados e estruturando soluções que funcionem na prática.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 18,
          }}
        >
          {skillGroups.map((group) => (
            <motion.article
              key={group.title}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{
                minHeight: 230,
                padding: 22,
                borderRadius: 26,
                background:
                  "linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.03))",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 18px 45px rgba(0, 0, 0, 0.18)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 10px",
                  color: "#ffffff",
                  fontSize: "1.2rem",
                }}
              >
                {group.title}
              </h4>

              <p
                style={{
                  margin: "0 0 18px",
                  minHeight: 48,
                  color: "rgba(255, 255, 255, 0.62)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                }}
              >
                {group.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.08, y: -4 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 9,
                        padding: "10px 12px",
                        borderRadius: 999,
                        background: "rgba(255, 255, 255, 0.055)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#ffffff",
                      }}
                    >
                      <Icon
                        style={{
                          color: item.color,
                          fontSize: 20,
                          filter: `drop-shadow(0 0 8px ${item.color})`,
                        }}
                      />

                      <span
                        style={{
                          fontSize: "0.88rem",
                          fontWeight: 800,
                        }}
                      >
                        {item.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}