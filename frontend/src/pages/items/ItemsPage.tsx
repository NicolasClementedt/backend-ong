// src/pages/items/ItemsPage.tsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Categoria, type Item, type CreateTransacaoDto } from "../../types";
import { itemsService } from "../../services/items.service";
import { transactionsService } from "../../services/transactions.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ItemCard from "../../components/Item/ItemCard";
import ItemForm from "../../components/Item/ItemForm";
import TransactionForm from "../../components/transactions/TransactionForm";

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
  const [itemParaMovimentacao, setItemParaMovimentacao] = useState<Item | null>(
    null,
  );
  const [modalMovimentacaoAberto, setModalMovimentacaoAberto] = useState(false);

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

  async function handleMovimentacao(dto: CreateTransacaoDto) {
    try {
      await transactionsService.create(dto);
      toast.success("Movimentação registrada com sucesso!");
      setModalMovimentacaoAberto(false);
      setItemParaMovimentacao(null);
      carregarItens();
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      toast.error(mensagem || "Erro ao registrar movimentação");
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
    <div>
      {/* Header */}
      <div>
        <div>
          <h1>Estoque</h1>
          <p>{itens.length} itens cadastrados</p>
        </div>
        <button onClick={handleNovoItem}>+ Novo Item</button>
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
        <div>
          <p>📦</p>
          <p>Nenhum item encontrado</p>
        </div>
      ) : (
        <div>
          {itens.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMovimentacao={(item) => {
                setItemParaMovimentacao(item);
                setModalMovimentacaoAberto(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Modal cadastro/edição */}
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

      {/* Modal movimentação */}
      {modalMovimentacaoAberto && (
        <TransactionForm
          itemPreSelecionado={itemParaMovimentacao}
          onSubmit={handleMovimentacao}
          onCancel={() => {
            setModalMovimentacaoAberto(false);
            setItemParaMovimentacao(null);
          }}
        />
      )}
    </div>
  );
}
