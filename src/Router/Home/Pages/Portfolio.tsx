import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiClock, FiExternalLink } from "react-icons/fi";

const previewProjects = [
  {
    title: "Dashboard de Dados",
    description:
      "Projetos com indicadores, visualizações e análises para apoiar decisões.",
    status: "Em breve",
  },
  {
    title: "Sistemas Web",
    description:
      "Interfaces modernas, integrações com APIs e experiências interativas.",
    status: "Em breve",
  },
  {
    title: "Projetos Mobile",
    description:
      "Aplicações mobile com foco em usabilidade, organização e performance.",
    status: "Em breve",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="section portfolio-section"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "112px 8%",
        background:
          "radial-gradient(circle at 15% 20%, rgba(139, 92, 246, 0.16), transparent 34%), radial-gradient(circle at 85% 80%, rgba(34, 211, 238, 0.11), transparent 34%), #070711",
      }}
    >
      <motion.div
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
            fontWeight: 900,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Portfólio
        </span>

        <h2
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: "clamp(2rem, 4vw, 3.35rem)",
            lineHeight: 1.08,
          }}
        >
          Meus trabalhos e projetos em construção
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
          Esta área será dedicada aos meus principais projetos, estudos de caso,
          dashboards, sistemas web e aplicações criadas para resolver problemas
          reais com dados, qualidade e programação.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 22,
        }}
      >
        {previewProjects.map((project) => (
          <motion.article
            key={project.title}
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            style={{
              minHeight: 260,
              padding: 26,
              borderRadius: 28,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.028)), rgba(12, 10, 24, 0.9)",
              boxShadow: "0 24px 70px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                display: "grid",
                placeItems: "center",
                borderRadius: 18,
                marginBottom: 20,
                background: "rgba(139, 92, 246, 0.16)",
                border: "1px solid rgba(216, 180, 254, 0.18)",
                color: "#d8b4fe",
                fontSize: 24,
              }}
            >
              <FiClock />
            </div>

            <h3
              style={{
                margin: "0 0 12px",
                color: "#ffffff",
                fontSize: "1.25rem",
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                margin: "0 0 22px",
                color: "rgba(255, 255, 255, 0.66)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
              }}
            >
              {project.description}
            </p>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 13px",
                borderRadius: 999,
                background: "rgba(34, 211, 238, 0.1)",
                border: "1px solid rgba(34, 211, 238, 0.18)",
                color: "#67e8f9",
                fontSize: "0.82rem",
                fontWeight: 800,
              }}
            >
              <FiExternalLink />
              {project.status}
            </span>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        style={{
          maxWidth: 1120,
          margin: "26px auto 0",
          padding: 26,
          borderRadius: 28,
          border: "1px solid rgba(216, 180, 254, 0.18)",
          background:
            "linear-gradient(145deg, rgba(139, 92, 246, 0.14), rgba(34, 211, 238, 0.06)), rgba(8, 13, 24, 0.88)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3
            style={{
              margin: "0 0 8px",
              color: "#ffffff",
              fontSize: "1.35rem",
            }}
          >
            Quer ver meus códigos?
          </h3>

          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.66)",
              lineHeight: 1.6,
            }}
          >
            Enquanto os estudos de caso são organizados, você pode acessar meu
            GitHub para acompanhar meus projetos.
          </p>
        </div>

        <motion.a
          href="https://github.com/darkblacks"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.96 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "13px 18px",
            borderRadius: 999,
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: 900,
            background: "rgba(139, 92, 246, 0.28)",
            border: "1px solid rgba(216, 180, 254, 0.28)",
          }}
        >
          <FaGithub />
          Acessar GitHub
        </motion.a>
      </motion.div>
    </section>
  );
}