// src/pages/dashboard/components/AlertaCard.tsx
import { type ResumoAlertas } from "../../types/index";

interface Props {
  resumo: ResumoAlertas;
}

export default function AlertaCard({ resumo }: Props) {
  const cards = [
    {
      label: "Normal",
      valor: resumo.verde,
      cor: "bg-green-50 border-green-200",
      textoCor: "text-green-700",
      valorCor: "text-green-600",
      emoji: "✅",
    },
    {
      label: "Estoque Baixo",
      valor: resumo.amarelo,
      cor: "bg-yellow-50 border-yellow-200",
      textoCor: "text-yellow-700",
      valorCor: "text-yellow-600",
      emoji: "⚠️",
    },
    {
      label: "Urgente",
      valor: resumo.vermelho,
      cor: "bg-red-50 border-red-200",
      textoCor: "text-red-700",
      valorCor: "text-red-600",
      emoji: "🚨",
    },
  ];

  return (
    <div>
      {cards.map((card) => (
        <div key={card.label} className={`${card.cor}`}>
          <div>
            <span className={` ${card.textoCor}`}>{card.label}</span>
            <span>{card.emoji}</span>
          </div>
          <span className={`${card.valorCor}`}>{card.valor}</span>
          <span className={`${card.textoCor}`}>
            {card.valor === 1 ? "item" : "itens"}
          </span>
        </div>
      ))}
    </div>
  );
}
