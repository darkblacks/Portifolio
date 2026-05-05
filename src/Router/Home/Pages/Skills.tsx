import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Qualidade from "./skills/qualidade";
import Dados from "./skills/dados";
import Programador from "./skills/programador";

type SkillTab = "qualidade" | "dados" | "programador";

const tabs: {
  id: SkillTab;
  title: string;
  subtitle: string;
  marker: string;
}[] = [
  {
    id: "qualidade",
    title: "Qualidade",
    subtitle: "Processos, melhoria contínua e operação",
    marker: "QA",
  },
  {
    id: "dados",
    title: "Análise de Dados",
    subtitle: "Indicadores, dashboards e leitura crítica",
    marker: "BI",
  },
  {
    id: "programador",
    title: "Programação",
    subtitle: "Interfaces, sistemas e automações",
    marker: "DEV",
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<SkillTab>("qualidade");

  return (
    <section
      id="skills"
      className="section skills-section"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "112px 8%",
        background:
          "radial-gradient(circle at 15% 18%, rgba(139, 92, 246, 0.18), transparent 34%), radial-gradient(circle at 85% 80%, rgba(34, 211, 238, 0.12), transparent 34%), #080812",
      }}
    >
      <motion.div
        className="skills-intro"
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          maxWidth: 860,
          margin: "0 auto 42px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            marginBottom: 14,
            color: "#c084fc",
            fontSize: "0.82rem",
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Skills
        </span>

        <h2
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: "clamp(2rem, 4vw, 3.35rem)",
            lineHeight: 1.08,
          }}
        >
          Qualidade, dados e código aplicados para resolver problemas reais
        </h2>

        <p
          style={{
            maxWidth: 720,
            margin: "20px auto 0",
            color: "rgba(255, 255, 255, 0.72)",
            fontSize: "1rem",
            lineHeight: 1.8,
          }}
        >
          Crio soluções digitais unindo qualidade, análise de dados e
          programação, com foco em organização, performance, clareza e
          experiência do usuário.
        </p>
      </motion.div>

      <motion.div
        className="skills-tabs"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
          maxWidth: 1080,
          margin: "0 auto 34px",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -4, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              style={{
                cursor: "pointer",
                border: isActive
                  ? "1px solid rgba(216, 180, 254, 0.68)"
                  : "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 22,
                padding: 18,
                minHeight: 112,
                textAlign: "left",
                background: isActive
                  ? "linear-gradient(145deg, rgba(139, 92, 246, 0.38), rgba(15, 23, 42, 0.9))"
                  : "rgba(255, 255, 255, 0.045)",
                boxShadow: isActive
                  ? "0 18px 55px rgba(139, 92, 246, 0.22)"
                  : "0 14px 34px rgba(0, 0, 0, 0.18)",
                color: "#ffffff",
                transition: "0.25s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: isActive
                      ? "rgba(255, 255, 255, 0.16)"
                      : "rgba(139, 92, 246, 0.16)",
                    color: isActive ? "#ffffff" : "#d8b4fe",
                    fontSize: "0.78rem",
                    fontWeight: 900,
                    letterSpacing: "0.06em",
                  }}
                >
                  {tab.marker}
                </span>

                <strong
                  style={{
                    fontSize: "1.05rem",
                  }}
                >
                  {tab.title}
                </strong>
              </div>

              <p
                style={{
                  margin: 0,
                  color: "rgba(255, 255, 255, 0.68)",
                  fontSize: "0.9rem",
                  lineHeight: 1.55,
                }}
              >
                {tab.subtitle}
              </p>
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === "qualidade" && <Qualidade key="qualidade" />}
        {activeTab === "dados" && <Dados key="dados" />}
        {activeTab === "programador" && <Programador key="programador" />}
      </AnimatePresence>
    </section>
  );
}