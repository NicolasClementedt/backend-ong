// src/pages/transactions/TransactionsPage.tsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { type Transacao, TipoTransacao } from "../../types";
import { transactionsService } from "../../services/transactions.service";
import TransactionForm from "../../components/transactions/TransactionForm";
import TransactionHistory from "../../components/transactions/TransactionHistory";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function TransactionsPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<string>("");

  async function carregarTransacoes() {
    try {
      setLoading(true);
      const data = await transactionsService.getAll(
        filtroTipo ? { tipo: filtroTipo as TipoTransacao } : undefined,
      );
      setTransacoes(data);
    } catch {
      toast.error("Erro ao carregar movimentações");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTransacoes();
  }, [filtroTipo]);

  async function handleSubmit(dto: any) {
    try {
      await transactionsService.create(dto);
      toast.success("Movimentação registrada com sucesso!");
      setModalAberto(false);
      carregarTransacoes();
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      toast.error(mensagem || "Erro ao registrar movimentação");
    }
  }

  return (
    <div>
      {/* Header */}
      <div>
        <div>
          <h1>Movimentações</h1>
          <p>{transacoes.length} registros</p>
        </div>
        <button onClick={() => setModalAberto(true)}>
          + Nova Movimentação
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        {[
          { value: "", label: "Todas" },
          { value: TipoTransacao.ENTRADA, label: "↓ Entradas" },
          { value: TipoTransacao.SAIDA, label: "↑ Saídas" },
        ].map((filtro) => (
          <button
            key={filtro.value}
            onClick={() => setFiltroTipo(filtro.value)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              filtroTipo === filtro.value
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {filtro.label}
          </button>
        ))}
      </div>

      {/* Histórico */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <TransactionHistory transacoes={transacoes} />
      )}

      {/* Modal */}
      {modalAberto && (
        <TransactionForm
          onSubmit={handleSubmit}
          onCancel={() => setModalAberto(false)}
        />
      )}
    </div>
  );
}
