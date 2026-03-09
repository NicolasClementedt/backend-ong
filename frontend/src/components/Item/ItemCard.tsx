// src/pages/items/components/ItemCard.tsx
//import AlertaBadge from "../../../components/AlertaBadge/AlertaBadge";

import type { Item } from "../../types";
import AlertaBadge from "../AlertaBadge/AlertaBadge";

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
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 text-base">{item.nome}</h3>
          <span className="text-xs text-gray-400">{item.categoria}</span>
        </div>
        <AlertaBadge nivel={item.nivelAlerta} />
      </div>

      {/* Quantidade */}
      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold text-gray-800">
          {item.quantidadeAtual}
        </span>
        <span className="text-sm text-gray-400 mb-1">{item.unidadeMedida}</span>
      </div>

      {/* Barra de progresso */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Estoque atual</span>
          <span>
            Mínimo: {item.quantidadeMinima} {item.unidadeMedida}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              item.nivelAlerta === "VERDE"
                ? "bg-green-500"
                : item.nivelAlerta === "AMARELO"
                  ? "bg-yellow-400"
                  : "bg-red-500"
            }`}
            style={{
              width: `${Math.min((item.quantidadeAtual / item.quantidadeMinima) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Ações */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => onMovimentacao(item)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-lg transition-colors"
        >
          + Movimentação
        </button>
        <button
          onClick={() => onEdit(item)}
          className="px-3 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="px-3 py-2 text-xs font-medium text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition-colors"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
