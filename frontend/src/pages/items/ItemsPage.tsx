// src/pages/items/ItemsPage.tsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Categoria, type Item } from "../../types";
import { itemsService } from "../../services/items.service";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ItemCard from "../../components/Item/ItemCard";
import ItemForm from "../../components/Item/ItemForm";

const categorias = [
  { value: "", label: "Todas" },
  { value: Categoria.ALIMENTO, label: "Alimento" },
  { value: Categoria.ROUPA, label: "Roupa" },
  { value: Categoria.HIGIENE, label: "Higiene" },
  { value: Categoria.BRINQUEDO, label: "Brinquedo" },
  { value: Categoria.LIMPEZA, label: "Limpeza" },
  { value: Categoria.OUTRO, label: "Outro" },
];

export default function ItemsPage() {
  const [itens, setItens] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [itemParaEditar, setItemParaEditar] = useState<Item | null>(null);

  async function carregarItens() {
    try {
      setLoading(true);
      const data = await itemsService.getAll(filtroCategoria || undefined);
      setItens(data);
    } catch {
      toast.error("Erro ao carregar itens");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarItens();
  }, [filtroCategoria]);

  async function handleSubmit(dto: any) {
    try {
      if (itemParaEditar) {
        await itemsService.update(itemParaEditar.id, dto);
        toast.success("Item atualizado com sucesso!");
      } else {
        await itemsService.create(dto);
        toast.success("Item cadastrado com sucesso!");
      }
      setModalAberto(false);
      setItemParaEditar(null);
      carregarItens();
    } catch {
      toast.error("Erro ao salvar item");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;
    try {
      await itemsService.remove(id);
      toast.success("Item excluído com sucesso!");
      carregarItens();
    } catch {
      toast.error("Erro ao excluir item");
    }
  }

  function handleEdit(item: Item) {
    setItemParaEditar(item);
    setModalAberto(true);
  }

  function handleNovoItem() {
    setItemParaEditar(null);
    setModalAberto(true);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Estoque</h1>
          <p className="text-sm text-gray-400">
            {itens.length} itens cadastrados
          </p>
        </div>
        <button
          onClick={handleNovoItem}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Novo Item
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {categorias.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFiltroCategoria(cat.value)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              filtroCategoria === cat.value
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lista */}
      {loading ? (
        <LoadingSpinner />
      ) : itens.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-sm">Nenhum item encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMovimentacao={() => {}}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalAberto && (
        <ItemForm
          itemParaEditar={itemParaEditar}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalAberto(false);
            setItemParaEditar(null);
          }}
        />
      )}
    </div>
  );
}
