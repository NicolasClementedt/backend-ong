import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Categoria, type Item, type CreateTransacaoDto } from "../../types";
import { itemsService } from "../../services/items.service";
import { transactionsService } from "../../services/transactions.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import styles from "./ItemPage.module.css";
import ItemForm from "../../components/Item/ItemForm/ItemForm";
import ItemCard from "../../components/Item/ItemCard/ItemCard";
import TransactionForm from "../../components/Transactions/TransactionForm/TransactionForm";

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

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerTexts}>
          <h1>Estoque</h1>
          <p>{itens.length} itens cadastrados</p>
        </div>
        <button
          className={styles.btnNovo}
          onClick={() => {
            setItemParaEditar(null);
            setModalAberto(true);
          }}
        >
          + Novo Item
        </button>
      </div>

      <div className={styles.filtros}>
        {categorias.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFiltroCategoria(cat.value)}
            className={`${styles.filtroBotao} ${filtroCategoria === cat.value ? styles.filtroAtivo : ""}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : itens.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>📦</p>
          <p className={styles.emptyText}>Nenhum item encontrado</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {itens.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={(item) => {
                setItemParaEditar(item);
                setModalAberto(true);
              }}
              onDelete={handleDelete}
              onMovimentacao={(item) => {
                setItemParaMovimentacao(item);
                setModalMovimentacaoAberto(true);
              }}
            />
          ))}
        </div>
      )}

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
