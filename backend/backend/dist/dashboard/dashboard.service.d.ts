import { PrismaService } from '../src/prisma/prisma.service';
import { NivelAlerta } from '../src/common/enums/enums';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private calcularAlerta;
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
            nivelAlerta: NivelAlerta;
        }[];
    }>;
}
