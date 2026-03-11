// src/pages/dashboard/components/TopSaidasChart.tsx
import { type TopSaida } from "../../types/index";

interface Props {
  topSaidas: TopSaida[];
}

export default function TopSaidasChart({ topSaidas }: Props) {
  if (topSaidas.length === 0) {
    return (
      <div>
        <h2>📊 Top Saídas (últimos 30 dias)</h2>
        <div>
          <p>Nenhuma saída registrada nos últimos 30 dias</p>
        </div>
      </div>
    );
  }

  const maxValor = Math.max(...topSaidas.map((s) => s.totalSaida));

  return (
    <div>
      <h2>📊 Top Saídas (últimos 30 dias)</h2>
      <div>
        {topSaidas.map((saida, index) => (
          <div key={saida.nome}>
            {/* Posição */}
            <span>{index + 1}</span>

            {/* Nome e barra */}
            <div>
              <div>
                <span>{saida.nome}</span>
                <span>
                  {saida.totalSaida} {saida.unidadeMedida}
                </span>
              </div>
              <div>
                <div
                  style={{ width: `${(saida.totalSaida / maxValor) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
