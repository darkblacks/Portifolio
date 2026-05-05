import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ImagePreview = {
  src: string;
  alt: string;
};

type ExpandableImageProps = {
  src: string;
  alt: string;
  width?: string;
  onOpen: (image: ImagePreview) => void;
};

function ExpandableImage({
  src,
  alt,
  width = "min(420px, 92%)",
  onOpen,
}: ExpandableImageProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen({ src, alt })}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
      style={{
        width: "100%",
        minHeight: 310,
        display: "grid",
        placeItems: "center",
        borderRadius: 28,
        background:
          "radial-gradient(circle at 50% 45%, rgba(34, 211, 238, 0.13), rgba(255, 255, 255, 0.045))",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        cursor: "zoom-in",
        padding: 22,
      }}
      aria-label={`Abrir imagem: ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width,
          height: "auto",
          objectFit: "contain",
          display: "block",
          pointerEvents: "none",
        }}
      />

      <span
        style={{
          marginTop: 14,
          color: "rgba(255, 255, 255, 0.62)",
          fontSize: "0.78rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
        }}
      >
        Clique para ampliar
      </span>
    </motion.button>
  );
}

function ImageModal({
  image,
  onClose,
}: {
  image: ImagePreview | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "grid",
            placeItems: "center",
            padding: 24,
            background: "rgba(3, 3, 10, 0.82)",
            backdropFilter: "blur(14px)",
            cursor: "zoom-out",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            style={{
              position: "relative",
              width: "min(1120px, 94vw)",
              maxHeight: "90vh",
              display: "grid",
              placeItems: "center",
              borderRadius: 30,
              padding: 22,
              background:
                "linear-gradient(145deg, rgba(34, 211, 238, 0.13), rgba(139, 92, 246, 0.1)), rgba(8, 13, 24, 0.96)",
              border: "1px solid rgba(103, 232, 249, 0.28)",
              boxShadow: "0 32px 100px rgba(0, 0, 0, 0.55)",
              cursor: "default",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar imagem ampliada"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                background: "rgba(255, 255, 255, 0.08)",
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <img
              src={image.src}
              alt={image.alt}
              style={{
                maxWidth: "100%",
                maxHeight: "82vh",
                objectFit: "contain",
                display: "block",
                borderRadius: 20,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DataSectionProps = {
  kicker: string;
  title: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
  imageSide: "left" | "right";
  imageWidth?: string;
  onOpenImage: (image: ImagePreview) => void;
};

function DataSection({
  kicker,
  title,
  paragraphs,
  imageSrc,
  imageAlt,
  imageSide,
  imageWidth,
  onOpenImage,
}: DataSectionProps) {
  const image = (
    <ExpandableImage
      src={imageSrc}
      alt={imageAlt}
      width={imageWidth}
      onOpen={onOpenImage}
    />
  );

  const content = (
    <div>
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
        {kicker}
      </span>

      <h3
        style={{
          margin: "0 0 18px",
          color: "#ffffff",
          fontSize: "clamp(1.7rem, 3vw, 2.45rem)",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h3>

      {paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          style={{
            margin: "0 0 18px",
            color: "rgba(255, 255, 255, 0.72)",
            fontSize: "1rem",
            lineHeight: 1.85,
          }}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );

  return (
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
        marginTop: 26,
        padding: 30,
        borderRadius: 32,
        border: "1px solid rgba(34, 211, 238, 0.18)",
        background:
          "linear-gradient(145deg, rgba(34, 211, 238, 0.09), rgba(139, 92, 246, 0.07)), rgba(8, 13, 24, 0.88)",
        boxShadow: "0 26px 80px rgba(0, 0, 0, 0.32)",
      }}
    >
      {imageSide === "left" ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </motion.section>
  );
}

export default function Dados() {
  const [previewImage, setPreviewImage] = useState<ImagePreview | null>(null);

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
      {/* SEÇÃO 1 - EXPERIÊNCIA NA BRAIDO */}
      <DataSection
        kicker="Experiência em dados"
        title="Controladoria, automação e dashboards para tomada de decisão"
        imageSrc="/braido.png"
        imageAlt="Experiência na Indústria Agroquímica Braido"
        imageSide="left"
        imageWidth="min(430px, 92%)"
        onOpenImage={setPreviewImage}
        paragraphs={[
          "Em agosto de 2024, tive a oportunidade de atuar como Analista de Dados na Indústria Agroquímica Braido, dentro do setor de Controladoria. Nesse ambiente, ampliei minha visão sobre indicadores, custeio, processos internos e a importância dos dados para apoiar decisões estratégicas.",
          "Apesar do contato com temas financeiros e de controladoria, meu principal objetivo era automatizar processos e transformar informações operacionais em análises mais claras. Com meu conhecimento em Excel avançado e Power BI, aprofundei habilidades práticas em SQL, acessando bases de dados do TOTVS e construindo dashboards interativos voltados para a diretoria.",
          "Essa experiência me permitiu conectar dados, processos e negócio: entender a origem da informação, tratar os dados corretamente e entregar visualizações que facilitassem a leitura dos resultados.",
        ]}
      />

      {/* SEÇÃO 2 - EXCEL, POWER BI, POWER QUERY E SQL */}
      <DataSection
        kicker="Ferramentas de análise"
        title="Excel, Power BI, Power Query e SQL trabalhando juntos"
        imageSrc="/office-dados.png"
        imageAlt="Ferramentas de análise de dados: Excel, Power BI, Power Query e SQL"
        imageSide="right"
        imageWidth="min(460px, 94%)"
        onOpenImage={setPreviewImage}
        paragraphs={[
          "A análise de dados começa muito antes do gráfico final. Ferramentas como Excel, Power BI e Power Query são essenciais para organizar, tratar, combinar e transformar dados brutos em bases mais limpas e confiáveis.",
          "O Excel me deu uma base forte em fórmulas, tabelas, validações e raciocínio lógico aplicado a dados. O Power Query ampliou essa visão ao permitir etapas de tratamento mais estruturadas, como limpeza de colunas, padronização de informações, junção de tabelas e criação de fluxos reutilizáveis.",
          "Quando essas ferramentas se conectam ao SQL, o processo se torna ainda mais poderoso. Em vez de depender apenas de planilhas manuais, é possível consultar diretamente bancos de dados, filtrar informações na origem e alimentar dashboards mais consistentes no Power BI.",
          "Substituí o modelo anterior pela integração com React e Python para criar interfaces mais dinâmicas e acessíveis via web. Além da facilidade de hospedagem, essa abordagem otimiza o monitoramento e a visualização de dados em tempo real.",
        ]}
      />

      {/* SEÇÃO 3 - SQL */}
      <DataSection
        kicker="Banco de dados"
        title="SQL como ponte entre sistemas, dados e análise"
        imageSrc="/sql.png"
        imageAlt="SQL aplicado à análise de dados"
        imageSide="left"
        imageWidth="min(420px, 90%)"
        onOpenImage={setPreviewImage}
        paragraphs={[
          "O SQL foi uma das principais ferramentas que coloquei em prática na área de dados. Ele permite acessar, consultar, filtrar, relacionar e estruturar informações diretamente no banco, tornando a análise mais precisa e menos dependente de extrações manuais.",
          "Na prática, utilizar SQL significa entender onde o dado nasce, como ele se relaciona com outras informações e quais filtros são necessários para responder perguntas reais do negócio. Isso torna a análise mais confiável e ajuda a construir indicadores com base em dados consistentes.",
          "Com SQL, dashboards deixam de ser apenas telas bonitas e passam a ser soluções conectadas à estrutura real da empresa, com dados tratados desde a origem até a visualização final.",
        ]}
      />

      {/* SEÇÃO 4 - PENSAMENTO ANALÍTICO E DIKW */}
      <DataSection
        kicker="Pensamento analítico"
        title="De dados brutos à informação que apoia decisões"
        imageSrc="/dikw.png"
        imageAlt="Pirâmide DIKW: dados, informação, conhecimento e sabedoria"
        imageSide="right"
        imageWidth="min(450px, 94%)"
        onOpenImage={setPreviewImage}
        paragraphs={[
          "A parte mais importante da análise de dados não é apenas saber usar ferramentas, mas desenvolver pensamento crítico e analítico. Dados isolados não explicam tudo; eles precisam ser tratados, contextualizados e interpretados para se transformarem em informação útil.",
          "A lógica da pirâmide DIKW ajuda a representar esse caminho: dados são registros brutos; informação é o dado organizado com contexto; conhecimento surge quando entendemos padrões e relações; e sabedoria aparece quando alguém usa esse conhecimento para tomar decisões melhores.",
          "Por isso, vejo a análise de dados como uma ponte entre o operacional e o estratégico. Meu papel é organizar e traduzir dados para que pessoas com visão de negócio possam enxergar problemas, oportunidades e caminhos de ação com mais clareza.",
        ]}
      />

      <ImageModal image={previewImage} onClose={() => setPreviewImage(null)} />
    </motion.div>
  );
}