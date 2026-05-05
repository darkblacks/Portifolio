import { motion } from "framer-motion";

/**
 * Variantes reutilizáveis para animações de entrada/saída com scroll.
 * 
 * O `whileInView="visible"` faz o elemento animar quando entra na tela.
 * O `viewport={{ once: false }}` permite animar novamente quando sai e volta.
 */
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 80,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
};

const navFade = {
  hidden: {
    opacity: 0,
    y: -24,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Initial() {
  return (
    <section className="section initial-section" id="home">
      {/* 
        NAVBAR
        Cabeçalho principal da primeira seção.
        A animação acontece sempre que a navbar entra novamente na viewport.
      */}
      <motion.header
        className="navbar"
        variants={navFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="brand"
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <motion.img
            src="/logo-v.png"
            alt="Logo Victor"
            animate={{
              y: [0, -3, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <span>Victor Ferreira Silva</span>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <a href="#home">Home</a>
          <a href="#code">Code</a>
          <a href="#skills">Skills</a>
        </motion.nav>

        
      </motion.header>

      {/* 
        OBJETO ANIMADO PRINCIPAL
        Esse é o objeto decorativo que você já tinha pedido:
        ele muda escala, rotação, borda e cor continuamente.
      */}
      <motion.div
        className="animated-box animated-box-primary"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        animate={{
          scale: [1, 1.8, 1.8, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          backgroundColor: [
            "#8b5cf6",
            "#a855f7",
            "#c084fc",
            "#6d28d9",
            "#8b5cf6",
          ],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />

      {/* 
        OBJETO ANIMADO SECUNDÁRIO
        Um segundo objeto menor para equilibrar a composição da hero,
        sem disputar atenção com a foto.
      */}
      <motion.div
        className="animated-box animated-box-secondary"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        animate={{
          y: [0, -18, 0],
          x: [0, 14, 0],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ["50%", "35%", "50%"],
          backgroundColor: ["#7c3aed", "#a855f7", "#8b5cf6"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 
        HERO CONTAINER
        Divide a tela em duas áreas:
        - esquerda: texto, tecnologias e botões
        - direita: imagem grande animada
      */}
      <div className="hero-container">
        {/* 
          LADO ESQUERDO
          Conteúdo textual com animações em cascata.
        */}
        <motion.div
          className="hero-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }}
          transition={{ staggerChildren: 0.14 }}
        >
          <motion.p
            className="eyebrow"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            ANALISTA DE QUALIDADE | <br></br>ANALISTA DE DADOS PLENO | <br></br>DESENVOLVEDOR FULL STACK
          </motion.p>

          <motion.h1
            id="title"
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Oi, eu sou o <span>Victor</span>
          </motion.h1>

          <motion.div
            className="hero-role"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="role-stack">Python • SQL • Power BI • Excel</span>
            <span className="role-stack">
              TypeScript • NestJS • JavaScript • React
            </span>
           <span className="role-stack"> BPMN • PDCA • Pareto • SIPOC • Kanban</span>
          </motion.div>

          <motion.p
            className="subtitle"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Crio soluções digitais unindo qualidade, análise de dados e programação, 
            com foco em organização, performance, clareza e experiência do usuário.
          </motion.p>

          <motion.div
            className="hero-actions"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
<motion.a
  href="#portfolio"
  whileHover={{ scale: 1.06, y: -3 }}
  whileTap={{ scale: 0.96 }}
  style={{
    textDecoration: "none",
  }}
>
  <button>Meu Trabalho</button>
</motion.a>

<motion.a
  href="#contato"
  whileHover={{ scale: 1.06, y: -3 }}
  whileTap={{ scale: 0.96 }}
  style={{
    textDecoration: "none",
  }}
>
  <button className="outline">Contato</button>
</motion.a>
          </motion.div>
        </motion.div>

        {/* 
          LADO DIREITO
          Área visual da hero.
          A foto entra e sai conforme scroll e continua com movimento suave.
        */}
        <motion.div
          className="hero-right"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div
            className="photo-wrapper"
            animate={{
              y: [0, -16, 0],
              rotate: [0, 1.2, 0, -1.2, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.025,
              rotate: 0,
            }}
          >
            <motion.img
              src="/victor.png"
              alt="Foto do Victor"
              animate={{
                scale: [1.04, 1.08, 1.04],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}