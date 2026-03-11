// src/components/AlertaBadge/AlertaBadge.tsx
import { NivelAlerta } from "../../types";

interface Props {
  nivel: NivelAlerta;
}

const config = {
  VERDE: {
    label: "Normal",
    classes: "bg-green-100 text-green-700 border border-green-300",
  },
  AMARELO: {
    label: "Baixo",
    classes: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  },
  VERMELHO: {
    label: "Urgente",
    classes: "bg-red-100 text-red-700 border border-red-300",
  },
};

export default function AlertaBadge({ nivel }: Props) {
  const { label, classes } = config[nivel];
  return <span className={`  ${classes}`}>{label}</span>;
}
