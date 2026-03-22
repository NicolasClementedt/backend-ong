import type { ResumoAlertas } from "../../../types/index";
import styles from "./AlertaCard.module.css";

interface Props {
  resumo: ResumoAlertas;
}

const cards = (resumo: ResumoAlertas) => [
  {
    label: "Normal",
    valor: resumo.verde,
    emoji: "✅",
    classe: styles.verde,
    descricao: "itens com estoque adequado",
  },
  {
    label: "Estoque Baixo",
    valor: resumo.amarelo,
    emoji: "⚠️",
    classe: styles.amarelo,
    descricao: "itens que requerem monitoramento",
  },
  {
    label: "Urgente",
    valor: resumo.vermelho,
    emoji: "🚨",
    classe: styles.vermelho,
    descricao: "itens com prioridade de arrecadação",
  },
];

export default function AlertaCard({ resumo }: Props) {
  return (
    <div className={styles.grid}>
      {cards(resumo).map((card) => (
        <div key={card.label} className={`${styles.card} ${card.classe}`}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>{card.label}</span>
            <span className={styles.emoji}>{card.emoji}</span>
          </div>
          <span className={styles.valor}>{card.valor}</span>
          <span className={styles.descricao}>
            {card.valor === 1 ? "item" : "itens"} {card.descricao}
          </span>
        </div>
      ))}
    </div>
  );
}
