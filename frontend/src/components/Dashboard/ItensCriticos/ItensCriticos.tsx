import { type ItemCritico, NivelAlerta } from "../../../types/index";
import styles from "./ItensCriticos.module.css";

interface Props {
  itensCriticos: ItemCritico[];
}

export default function ItensCriticos({ itensCriticos }: Props) {
  if (itensCriticos.length === 0) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>🚨 Itens que Precisam de Atenção</h2>
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>✅</p>
          <p className={styles.emptyText}>
            Todos os itens estão com estoque normal!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>🚨 Itens que Precisam de Atenção</h2>
      <div className={styles.lista}>
        {itensCriticos.map((item) => (
          <div key={item.nome} className={styles.item}>
            <div
              className={`${styles.indicador} ${
                item.nivelAlerta === NivelAlerta.VERMELHO
                  ? styles.indicadorVermelho
                  : styles.indicadorAmarelo
              }`}
            />
            <div className={styles.info}>
              <p className={styles.nome}>{item.nome}</p>
              <p className={styles.quantidade}>
                {item.quantidadeAtual} / {item.quantidadeMinima}{" "}
                {item.unidadeMedida}
              </p>
            </div>
            <div className={styles.percentualWrapper}>
              <p
                className={`${styles.percentual} ${
                  item.nivelAlerta === NivelAlerta.VERMELHO
                    ? styles.percentualVermelho
                    : styles.percentualAmarelo
                }`}
              >
                {item.percentual}%
              </p>
              <p className={styles.percentualLabel}>do mínimo</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
