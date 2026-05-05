import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";

const paretoRawData = [
  { problema: "Sem chip", ocorrencias: 38 },
  { problema: "Bateria abaixo de 90%", ocorrencias: 28 },
  { problema: "Erro de configuração", ocorrencias: 19 },
  { problema: "Tela quebrada", ocorrencias: 16 },
  { problema: "Carregador danificado", ocorrencias: 11 },
  { problema: "Sem conexão", ocorrencias: 8 },
  { problema: "Bobina ausente", ocorrencias: 6 },
  { problema: "Máquina não liga", ocorrencias: 4 },
];

const totalOcorrencias = paretoRawData.reduce(
  (total, item) => total + item.ocorrencias,
  0
);

let acumulado = 0;

const paretoData = paretoRawData.map((item) => {
  acumulado += item.ocorrencias;

  return {
    ...item,
    percentualAcumulado: Number(
      ((acumulado / totalOcorrencias) * 100).toFixed(1)
    ),
  };
});

const chartColors = [
  "#8b5cf6",
  "#a855f7",
  "#c084fc",
  "#22d3ee",
  "#f472b6",
  "#818cf8",
];
type ImagePreview = {
  src: string;
  alt: string;
};

type ExpandableImageProps = {
  src: string;
  alt: string;
  width: string;
  onOpen: (image: ImagePreview) => void;
};

function ExpandableImage({ src, alt, width, onOpen }: ExpandableImageProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen({ src, alt })}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
      style={{
        width: "100%",
        minHeight: 300,
        display: "grid",
        placeItems: "center",
        borderRadius: 28,
        background: "rgba(255, 255, 255, 0.055)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        cursor: "zoom-in",
        padding: 20,
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
                "linear-gradient(145deg, rgba(139, 92, 246, 0.16), rgba(255, 255, 255, 0.06)), rgba(12, 10, 24, 0.96)",
              border: "1px solid rgba(216, 180, 254, 0.28)",
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
export default function Qualidade() {
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
      {/* SEÇÃO 1 - EXPERIÊNCIA NA ZIG */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 28,
          alignItems: "center",
          padding: 30,
          borderRadius: 32,
          border: "1px solid rgba(216, 180, 254, 0.2)",
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.028)), rgba(15, 15, 28, 0.88)",
          boxShadow: "0 26px 80px rgba(0, 0, 0, 0.35)",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.025 }}
          style={{
            minHeight: 300,
            display: "grid",
            placeItems: "center",
            borderRadius: 28,
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.22), rgba(255, 255, 255, 0.04))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
<ExpandableImage
  src="/zig.png"
  alt="Logo da ZIG"
  width="min(260px, 80%)"
  onOpen={setPreviewImage}
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
            Experiência em qualidade
          </span>

          <h3
            style={{
              margin: "0 0 18px",
              color: "#ffffff",
              fontSize: "clamp(1.8rem, 3vw, 2.7rem)",
              lineHeight: 1.1,
            }}
          >
            Atuação em auditoria, processos e análise da qualidade
          </h3>

          <p
            style={{
              margin: "0 0 18px",
              color: "rgba(255, 255, 255, 0.74)",
              fontSize: "1rem",
              lineHeight: 1.85,
            }}
          >
            Trabalhei na ZIG como Analista de Qualidade, com atuação voltada
            para a área de auditoria operacional. Por ser um ambiente com muita
            troca entre áreas e uso constante de workspace colaborativo, tive
            contato direto com rotinas de qualidade, análise de processos,
            identificação de falhas e acompanhamento de padrões operacionais.
            Tive também a oportunidade de viver experiencias com metodologias ágeis,
            utilizar ferramentas como Kanban,5W2H,5 Porquês e SIPOC para organizar o trabalho, estruturar análises e conduzir <br></br>
            Aprimorei conhecimentos em análise de dados, indicadores e construção de dashboards.
          </p>

          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.68)",
              fontSize: "0.98rem",
              lineHeight: 1.8,
            }}
          >
            Essa vivência me ajudou a desenvolver uma visão mais crítica sobre
            processos, melhoria contínua e análise estatística da qualidade,
            conectando dados, auditoria e operação para apoiar decisões mais
            objetivas.
          </p>
        </div>
      </section>

      {/* SEÇÃO 2 - PDCA */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 28,
          alignItems: "center",
          marginTop: 26,
          padding: 30,
          borderRadius: 32,
          border: "1px solid rgba(34, 211, 238, 0.18)",
          background:
            "linear-gradient(145deg, rgba(34, 211, 238, 0.09), rgba(255, 255, 255, 0.032)), rgba(8, 13, 24, 0.88)",
          boxShadow: "0 26px 80px rgba(0, 0, 0, 0.32)",
        }}
      >
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
            Metodologia aplicada
          </span>

          <h3
            style={{
              margin: "0 0 18px",
              color: "#ffffff",
              fontSize: "clamp(1.7rem, 3vw, 2.45rem)",
              lineHeight: 1.1,
            }}
          >
            PDCA como base para melhoria contínua
          </h3>

          <p
            style={{
              margin: "0 0 18px",
              color: "rgba(255, 255, 255, 0.74)",
              fontSize: "1rem",
              lineHeight: 1.85,
            }}
          >
            A metodologia utilizada na rotina de qualidade era o ciclo PDCA,
            uma abordagem voltada para melhoria contínua dos processos. O método
            organiza a análise em quatro etapas: planejar, executar, verificar
            os resultados e agir sobre os pontos que precisam de correção ou
            padronização.
          </p>

          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.68)",
              fontSize: "0.98rem",
              lineHeight: 1.8,
            }}
          >
            Na prática, o PDCA ajuda a evitar decisões baseadas apenas em
            percepção. Ele orienta a investigação do problema, o teste de
            melhorias, a medição dos resultados e a consolidação das ações que
            realmente funcionam.
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.025 }}
          style={{
            minHeight: 300,
            display: "grid",
            placeItems: "center",
            borderRadius: 28,
            background: "rgba(255, 255, 255, 0.055)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
          }}
        >
<ExpandableImage
  src="/pdca.png"
  alt="Representação do ciclo PDCA"
  width="min(430px, 90%)"
  onOpen={setPreviewImage}
/>
        </motion.div>
      </section>

      {/* SEÇÃO 3 - GREEN BELT E BPMN */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "0.95fr 1.05fr",
          gap: 28,
          alignItems: "center",
          marginTop: 26,
          padding: 30,
          borderRadius: 32,
          border: "1px solid rgba(192, 132, 252, 0.2)",
          background:
            "linear-gradient(145deg, rgba(139, 92, 246, 0.12), rgba(255, 255, 255, 0.032)), rgba(13, 10, 24, 0.88)",
          boxShadow: "0 26px 80px rgba(0, 0, 0, 0.32)",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.025 }}
          style={{
            minHeight: 300,
            display: "grid",
            placeItems: "center",
            borderRadius: 28,
            background: "rgba(255, 255, 255, 0.055)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
          }}
        >
<ExpandableImage
  src="/bpmn.png"
  alt="Exemplo visual de BPMN"
  width="min(520px, 94%)"
  onOpen={setPreviewImage}
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
            Formação complementar
          </span>

          <h3
            style={{
              margin: "0 0 18px",
              color: "#ffffff",
              fontSize: "clamp(1.7rem, 3vw, 2.45rem)",
              lineHeight: 1.1,
            }}
          >
            Green Belt e modelagem de processos com BPMN
          </h3>

          <p
            style={{
              margin: "0 0 18px",
              color: "rgba(255, 255, 255, 0.74)",
              fontSize: "1rem",
              lineHeight: 1.85,
            }}
          >
            No mesmo período, realizei um curso de Green Belt na Udemy, onde
            aprofundei conceitos de qualidade, melhoria de processos e análise
            estruturada de problemas. Nesse curso, também tive contato com BPMN,
            sigla para Business Process Model and Notation.
          </p>
          <p>
            Na formação Green Belt, 
            também desenvolvi uma base mais estruturada sobre análise estatística de processos,
             entendendo como os dados podem ser usados para medir desempenho, 
             identificar variações, acompanhar padrões e apoiar decisões de melhoria.
            Tive contato com ferramentas como QFD, gráficos de controle, 
            histogramas, diagramas de dispersão, matriz de causa e efeito e 
            outras análises visuais que ajudam a transformar problemas operacionais 
            em oportunidades de otimização.
          </p> <br></br>
          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.68)",
              fontSize: "0.98rem",
              lineHeight: 1.8,
            }}
          >
            A BPMN é utilizada para representar processos de forma visual e
            padronizada. Ela facilita o entendimento do fluxo de trabalho,
            permitindo enxergar etapas, responsáveis, decisões, gargalos e
            oportunidades de melhoria dentro de uma operação.
          </p>
        </div>
      </section>

      {/* SEÇÃO 4 - PARETO */}
      <section
        style={{
          marginTop: 26,
          padding: 30,
          borderRadius: 32,
          border: "1px solid rgba(216, 180, 254, 0.2)",
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.085), rgba(255, 255, 255, 0.028)), rgba(10, 10, 22, 0.9)",
          boxShadow: "0 26px 80px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.95fr 1.05fr",
            gap: 28,
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                marginBottom: 14,
                color: "#f0abfc",
                fontSize: "0.78rem",
                fontWeight: 900,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Priorização de problemas
            </span>

            <h3
              style={{
                margin: "0 0 18px",
                color: "#ffffff",
                fontSize: "clamp(1.7rem, 3vw, 2.45rem)",
                lineHeight: 1.1,
              }}
            >
              Pareto aplicado à auditoria de setup
            </h3>

            <p
              style={{
                margin: "0 0 18px",
                color: "rgba(255, 255, 255, 0.74)",
                fontSize: "1rem",
                lineHeight: 1.85,
              }}
            >
              Dentro da ZIG, utilizei a metodologia de Pareto para identificar
              gargalos na área de setup. A análise ajudava a encontrar erros de
              configuração, falhas físicas nas maquininhas e outros problemas
              que impactavam diretamente os SLAs solicitados pelas áreas.
            </p>

            <p
              style={{
                margin: 0,
                color: "rgba(255, 255, 255, 0.68)",
                fontSize: "0.98rem",
                lineHeight: 1.8,
              }}
            >
              A partir dessas auditorias, era possível verificar se os padrões
              estavam sendo atendidos, priorizar os problemas mais recorrentes e
              direcionar ações corretivas para melhorar a qualidade da entrega
              operacional.
            </p>
          </div>

          <div
  style={{
    height: 420,
    padding: 18,
    borderRadius: 26,
    background: "rgba(255, 255, 255, 0.052)",
    border: "1px solid rgba(255, 255, 255, 0.09)",
  }}
>
  <ResponsiveContainer width="100%" height="100%">
  <ComposedChart
    data={paretoData}
    margin={{ top: 34, right: 18, left: 18, bottom: 70 }}
  >
    <CartesianGrid
      strokeDasharray="3 3"
      stroke="rgba(255, 255, 255, 0.07)"
      vertical={false}
    />

    <XAxis
      dataKey="problema"
      interval={0}
      angle={-28}
      textAnchor="end"
      height={86}
      axisLine={false}
      tickLine={false}
      tick={{
        fill: "rgba(255, 255, 255, 0.78)",
        fontSize: 10,
        fontWeight: 600,
      }}
    />

    <YAxis
      yAxisId="left"
      axisLine={false}
      tickLine={false}
      tick={false}
      width={0}
    />

    <YAxis
      yAxisId="right"
      orientation="right"
      domain={[0, 100]}
      axisLine={false}
      tickLine={false}
      tick={false}
      width={0}
    />

    <Tooltip
      cursor={{
        fill: "rgba(255, 255, 255, 0.055)",
      }}
      contentStyle={{
        background: "rgba(248, 250, 252, 0.96)",
        border: "1px solid rgba(216, 180, 254, 0.45)",
        borderRadius: 16,
        color: "#111827",
        boxShadow: "0 18px 50px rgba(0, 0, 0, 0.35)",
        padding: "12px 14px",
      }}
      labelStyle={{
        color: "#111827",
        fontWeight: 900,
        marginBottom: 8,
      }}
      itemStyle={{
        color: "#111827",
        fontWeight: 700,
      }}
      formatter={(value, name) => {
        if (name === "percentualAcumulado") {
          return [`${value}%`, "Porcentagem acumulada"];
        }

        return [value, "Ocorrências"];
      }}
    />

    <Bar
      yAxisId="left"
      dataKey="ocorrencias"
      radius={[12, 12, 0, 0]}
      barSize={34}
    >
      <LabelList
        dataKey="ocorrencias"
        position="top"
        fill="#ffffff"
        fontSize={11}
        fontWeight={900}
      />

      {paretoData.map((entry, index) => (
        <Cell
          key={entry.problema}
          fill={chartColors[index % chartColors.length]}
        />
      ))}
    </Bar>

    <Line
      yAxisId="right"
      type="monotone"
      dataKey="percentualAcumulado"
      stroke="#f472b6"
      strokeWidth={3}
      dot={{
        r: 5,
        fill: "#f472b6",
        stroke: "#ffffff",
        strokeWidth: 1.5,
      }}
      activeDot={{
        r: 7,
        fill: "#f472b6",
        stroke: "#ffffff",
        strokeWidth: 2,
      }}
    >
      <LabelList
        dataKey="percentualAcumulado"
        position="top"
        formatter={(value: number) => `${value}%`}
        fill="#f9a8d4"
        fontSize={11}
        fontWeight={900}
      />
    </Line>
  </ComposedChart>
</ResponsiveContainer>
</div>
        </div>
      </section>

      <ImageModal image={previewImage} onClose={() => setPreviewImage(null)} />
    </motion.div>
  );
}