import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { type Transacao, TipoTransacao } from "../../types";
import { transactionsService } from "../../services/transactions.service";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import styles from "./TransactionsPage.module.css";
import TransactionHistory from "../../components/Transactions/TransactionHistory/TransactionHistory";
import TransactionForm from "../../components/Transactions/TransactionForm/TransactionForm";

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
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerTexts}>
          <h1>Movimentações</h1>
          <p>{transacoes.length} registros</p>
        </div>
        <button className={styles.btnNovo} onClick={() => setModalAberto(true)}>
          + Nova Movimentação
        </button>
      </div>

      <div className={styles.filtros}>
        {[
          { value: "", label: "Todas" },
          { value: TipoTransacao.ENTRADA, label: "↓ Entradas" },
          { value: TipoTransacao.SAIDA, label: "↑ Saídas" },
        ].map((filtro) => (
          <button
            key={filtro.value}
            onClick={() => setFiltroTipo(filtro.value)}
            className={`${styles.filtroBotao} ${
              filtroTipo === filtro.value ? styles.filtroAtivo : ""
            }`}
          >
            {filtro.label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <TransactionHistory transacoes={transacoes} />
      )}

      {modalAberto && (
        <TransactionForm
          onSubmit={handleSubmit}
          onCancel={() => setModalAberto(false)}
        />
      )}
    </div>
  );
}
