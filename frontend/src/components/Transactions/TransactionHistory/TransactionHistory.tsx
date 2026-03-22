import { type Transacao, TipoTransacao } from "../../../types";
import styles from "./TransactionHistory.module.css";

interface Props {
  transacoes: Transacao[];
}

export default function TransactionHistory({ transacoes }: Props) {
  if (transacoes.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyIcon}>📋</p>
        <p className={styles.emptyText}>Nenhuma movimentação encontrada</p>
      </div>
    );
  }

  return (
    <div className={styles.lista}>
      {transacoes.map((transacao) => (
        <div key={transacao.id} className={styles.item}>
          <div
            className={`${styles.icone} ${
              transacao.tipo === TipoTransacao.ENTRADA
                ? styles.iconeEntrada
                : styles.iconeSaida
            }`}
          >
            {transacao.tipo === TipoTransacao.ENTRADA ? "↓" : "↑"}
          </div>

          <div className={styles.info}>
            <div className={styles.infoHeader}>
              <span className={styles.nome}>{transacao.item.nome}</span>
              <span
                className={`${styles.badge} ${
                  transacao.tipo === TipoTransacao.ENTRADA
                    ? styles.badgeEntrada
                    : styles.badgeSaida
                }`}
              >
                {transacao.tipo === TipoTransacao.ENTRADA ? "Entrada" : "Saída"}
              </span>
            </div>
            <p className={styles.detalhes}>
              {transacao.categoriaDestino && `→ ${transacao.categoriaDestino}`}
              {transacao.descricaoDestino && `  ${transacao.descricaoDestino}`}
              {transacao.observacao && `  ${transacao.observacao}`}
            </p>
          </div>

          <div className={styles.quantidadeWrapper}>
            <p
              className={`${styles.quantidade} ${
                transacao.tipo === TipoTransacao.ENTRADA
                  ? styles.quantidadeEntrada
                  : styles.quantidadeSaida
              }`}
            >
              {transacao.tipo === TipoTransacao.ENTRADA ? "+" : "-"}
              {transacao.quantidade} {transacao.item.unidadeMedida}
            </p>
            <p className={styles.data}>
              {new Date(transacao.data).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
