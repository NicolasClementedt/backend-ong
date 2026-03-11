// src/pages/dashboard/components/ItensCriticos.tsx
import { type ItemCritico, NivelAlerta } from "../../types/index";

interface Props {
  itensCriticos: ItemCritico[];
}

export default function ItensCriticos({ itensCriticos }: Props) {
  if (itensCriticos.length === 0) {
    return (
      <div>
        <h2>🚨 Itens que Precisam de Atenção</h2>
        <div>
          <p>✅</p>
          <p>Todos os itens estão com estoque normal!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>🚨 Itens que Precisam de Atenção</h2>
      <div>
        {itensCriticos.map((item) => (
          <div key={item.nome}>
            {/* Indicador de nível */}
            <div
              className={` ${
                item.nivelAlerta === NivelAlerta.VERMELHO
                  ? "bg-red-500"
                  : "bg-yellow-400"
              }`}
            />

            {/* Info */}
            <div>
              <p>{item.nome}</p>
              <p>
                {item.quantidadeAtual} / {item.quantidadeMinima}{" "}
                {item.unidadeMedida}
              </p>
            </div>

            {/* Percentual */}
            <div>
              <span
                className={`text-sm font-bold ${
                  item.nivelAlerta === NivelAlerta.VERMELHO
                    ? "text-red-500"
                    : "text-yellow-600"
                }`}
              >
                {item.percentual}%
              </span>
              <p>do mínimo</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
