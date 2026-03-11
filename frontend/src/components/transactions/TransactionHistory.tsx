// src/pages/transactions/components/TransactionHistory.tsx
import { type Transacao, TipoTransacao } from "../../types/index";

interface Props {
  transacoes: Transacao[];
}

export default function TransactionHistory({ transacoes }: Props) {
  if (transacoes.length === 0) {
    return (
      <div>
        <p>📋</p>
        <p>Nenhuma movimentação encontrada</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {transacoes.map((transacao) => (
        <div key={transacao.id}>
          {/* Ícone tipo */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
              transacao.tipo === TipoTransacao.ENTRADA
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            {transacao.tipo === TipoTransacao.ENTRADA ? "↓" : "↑"}
          </div>

          {/* Info principal */}
          <div>
            <div>
              <span>{transacao.item.nome}</span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  transacao.tipo === TipoTransacao.ENTRADA
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {transacao.tipo === TipoTransacao.ENTRADA ? "Entrada" : "Saída"}
              </span>
            </div>

            <div>
              {transacao.categoriaDestino && (
                <span className="mr-2">→ {transacao.categoriaDestino}</span>
              )}
              {transacao.descricaoDestino && (
                <span className="mr-2">{transacao.descricaoDestino}</span>
              )}
              {transacao.observacao && <span>{transacao.observacao}</span>}
            </div>
          </div>

          {/* Quantidade e data */}
          <div>
            <p
              className={`font-bold text-base ${
                transacao.tipo === TipoTransacao.ENTRADA
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {transacao.tipo === TipoTransacao.ENTRADA ? "+" : "-"}
              {transacao.quantidade} {transacao.item.unidadeMedida}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(transacao.data).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
