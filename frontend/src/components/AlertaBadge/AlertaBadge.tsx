import { NivelAlerta } from "../../types";
import styles from "./AlertaBadge.module.css";

interface Props {
  nivel: NivelAlerta;
}

const config = {
  VERDE: { label: "Normal", classe: styles.verde },
  AMARELO: { label: "Baixo", classe: styles.amarelo },
  VERMELHO: { label: "Urgente", classe: styles.vermelho },
};

export default function AlertaBadge({ nivel }: Props) {
  const { label, classe } = config[nivel];
  return <span className={`${styles.badge} ${classe}`}>{label}</span>;
}
