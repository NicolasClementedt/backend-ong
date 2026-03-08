import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(): Promise<{
        resumoAlertas: {
            verde: number;
            amarelo: number;
            vermelho: number;
        };
        topSaidas: {
            nome: string;
            totalSaida: number;
            unidadeMedida: string;
        }[];
        itensCriticos: {
            nome: string;
            unidadeMedida: string;
            quantidadeAtual: number;
            quantidadeMinima: number;
            percentual: number;
            nivelAlerta: import("../src/common/enums/enums").NivelAlerta;
        }[];
    }>;
}
