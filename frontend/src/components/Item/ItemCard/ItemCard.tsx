import { type Item, NivelAlerta } from "../../../types";
import AlertaBadge from "../../../components/AlertaBadge/AlertaBadge";
import styles from "./ItemCard.module.css";

interface Props {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  onMovimentacao: (item: Item) => void;
}

export default function ItemCard({
  item,
  onEdit,
  onDelete,
  onMovimentacao,
}: Props) {
  const progressoClasse = {
    VERDE: styles.progressoVerde,
    AMARELO: styles.progressoAmarelo,
    VERMELHO: styles.progressoVermelho,
  }[item.nivelAlerta];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerTexts}>
          <h3>{item.nome}</h3>
          <span>{item.categoria}</span>
        </div>
        <AlertaBadge nivel={item.nivelAlerta as NivelAlerta} />
      </div>

      <div className={styles.quantidade}>
        <span className={styles.quantidadeValor}>{item.quantidadeAtual}</span>
        <span className={styles.quantidadeUnidade}>{item.unidadeMedida}</span>
      </div>

      <div className={styles.progresso}>
        <div className={styles.progressoInfo}>
          <span>Estoque atual</span>
          <span>
            Mínimo: {item.quantidadeMinima} {item.unidadeMedida}
          </span>
        </div>
        <div className={styles.progressoWrapper}>
          <div
            className={`${styles.progressoBarra} ${progressoClasse}`}
            style={{
              width: `${Math.min((item.quantidadeAtual / item.quantidadeMinima) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      <div className={styles.acoes}>
        <button
          className={styles.btnMovimentacao}
          onClick={() => onMovimentacao(item)}
        >
          + Movimentação
        </button>
        <button className={styles.btnEditar} onClick={() => onEdit(item)}>
          Editar
        </button>
        <button className={styles.btnExcluir} onClick={() => onDelete(item.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}
