import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const WHATSAPP_NUMBER = "11956711991";
const EMAIL = "victorferreira.s0307@email.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/victor-ferreira0307/";
const GITHUB_URL = "https://github.com/darkblacks";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  function updateField(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = `
Olá, Victor! Vim pelo seu portfólio.

Nome: ${formData.nome}
E-mail: ${formData.email}
Assunto: ${formData.assunto}

Mensagem:
${formData.mensagem}
`.trim();

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="contato"
      className="section contact-section"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "112px 8%",
        background:
          "radial-gradient(circle at 18% 22%, rgba(34, 211, 238, 0.13), transparent 34%), radial-gradient(circle at 84% 78%, rgba(139, 92, 246, 0.18), transparent 34%), #080812",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 28,
          alignItems: "stretch",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            padding: 32,
            borderRadius: 32,
            border: "1px solid rgba(216, 180, 254, 0.18)",
            background:
              "linear-gradient(145deg, rgba(139, 92, 246, 0.16), rgba(34, 211, 238, 0.06)), rgba(12, 10, 24, 0.9)",
            boxShadow: "0 26px 80px rgba(0, 0, 0, 0.32)",
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
            Contato
          </span>

          <h2
            style={{
              margin: "0 0 18px",
              color: "#ffffff",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.08,
            }}
          >
            Vamos conversar sobre projetos, dados ou tecnologia?
          </h2>

          <p
            style={{
              margin: "0 0 28px",
              color: "rgba(255, 255, 255, 0.72)",
              fontSize: "1rem",
              lineHeight: 1.8,
            }}
          >
            Preencha o formulário e ele vai montar uma mensagem automática para
            WhatsApp. Assim o contato chega de forma direta, organizada e com as
            informações principais.
          </p>

          <div
            style={{
              display: "grid",
              gap: 12,
            }}
          >
            <a
              href={`mailto:${EMAIL}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 14,
                borderRadius: 18,
                color: "#ffffff",
                textDecoration: "none",
                background: "rgba(255, 255, 255, 0.055)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <FaEnvelope color="#67e8f9" />
              {EMAIL}
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 14,
                borderRadius: 18,
                color: "#ffffff",
                textDecoration: "none",
                background: "rgba(255, 255, 255, 0.055)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <FaWhatsapp color="#22c55e" />
              WhatsApp
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 14,
                borderRadius: 18,
                color: "#ffffff",
                textDecoration: "none",
                background: "rgba(255, 255, 255, 0.055)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <FaLinkedin color="#38bdf8" />
              LinkedIn
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 14,
                borderRadius: 18,
                color: "#ffffff",
                textDecoration: "none",
                background: "rgba(255, 255, 255, 0.055)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <FaGithub color="#c084fc" />
              GitHub
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          style={{
            padding: 32,
            borderRadius: 32,
            border: "1px solid rgba(34, 211, 238, 0.18)",
            background:
              "linear-gradient(145deg, rgba(34, 211, 238, 0.1), rgba(255, 255, 255, 0.032)), rgba(8, 13, 24, 0.9)",
            boxShadow: "0 26px 80px rgba(0, 0, 0, 0.32)",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 16,
            }}
          >
            <label style={{ color: "#ffffff", fontWeight: 800 }}>
              Nome
              <input
                name="nome"
                value={formData.nome}
                onChange={updateField}
                required
                placeholder="Digite seu nome"
                style={inputStyle}
              />
            </label>

            <label style={{ color: "#ffffff", fontWeight: 800 }}>
              E-mail
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={updateField}
                required
                placeholder="Digite seu e-mail"
                style={inputStyle}
              />
            </label>

            <label style={{ color: "#ffffff", fontWeight: 800 }}>
              Assunto
              <input
                name="assunto"
                value={formData.assunto}
                onChange={updateField}
                required
                placeholder="Ex: Projeto, oportunidade, parceria..."
                style={inputStyle}
              />
            </label>

            <label style={{ color: "#ffffff", fontWeight: 800 }}>
              Mensagem
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={updateField}
                required
                placeholder="Escreva sua mensagem"
                rows={6}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: 150,
                }}
              />
            </label>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginTop: 8,
                cursor: "pointer",
                border: "1px solid rgba(216, 180, 254, 0.3)",
                borderRadius: 999,
                padding: "15px 20px",
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(34, 211, 238, 0.72))",
                color: "#ffffff",
                fontSize: "1rem",
                fontWeight: 900,
                boxShadow: "0 18px 45px rgba(139, 92, 246, 0.25)",
              }}
            >
              Enviar pelo WhatsApp
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 8,
  border: "1px solid rgba(255, 255, 255, 0.12)",
  borderRadius: 18,
  padding: "14px 16px",
  background: "rgba(255, 255, 255, 0.065)",
  color: "#ffffff",
  outline: "none",
  fontSize: "0.95rem",
  fontFamily: "inherit",
};