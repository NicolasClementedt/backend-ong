// src/pages/dashboard/DashboardPage.tsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { dashboardService } from "../../services/dashboard.service";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import type { Dashboard } from "../../types";
import AlertaCard from "../../components/Dashboard/AlertaCard";
import TopSaidasChart from "../../components/Dashboard/TopSaidasChart";
import ItensCriticos from "../../components/Dashboard/ItensCriticos";

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
    <div>
      {/* Header */}
      <div>
        <div>
          <h1>Dashboard</h1>
          <p>Visão geral do estoque</p>
        </div>
        <button onClick={carregarDashboard}>↻ Atualizar</button>
      </div>

      {/* Cards de alerta */}
      <AlertaCard resumo={dashboard.resumoAlertas} />

      {/* Top saídas e itens críticos */}
      <div>
        <TopSaidasChart topSaidas={dashboard.topSaidas} />
        <ItensCriticos itensCriticos={dashboard.itensCriticos} />
      </div>
    </div>
  );
}
