import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { dashboardService } from "../../services/dashboard.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import styles from "./DashboardPage.module.css";
import ItensCriticos from "../../components/Dashboard/ItensCriticos/ItensCriticos";
import type { Dashboard } from "../../types";
import TopSaidasChart from "../../components/Dashboard/TopSaidasChart/TopSaidasChart";
import AlertaCard from "../../components/Dashboard/AlertaCard/AlertaCard";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregarDashboard() {
    try {
      setLoading(true);
      const data = await dashboardService.get();
      setDashboard(data);
    } catch {
      toast.error("Erro ao carregar dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDashboard();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!dashboard) return null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerTexts}>
          <h1>Dashboard</h1>
          <p>Visão geral do estoque</p>
        </div>
        <button className={styles.refreshButton} onClick={carregarDashboard}>
          ↻ Atualizar
        </button>
      </div>

      <AlertaCard resumo={dashboard.resumoAlertas} />

      <div className={styles.grid}>
        <TopSaidasChart topSaidas={dashboard.topSaidas} />
        <ItensCriticos itensCriticos={dashboard.itensCriticos} />
      </div>
    </div>
  );
}
