"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../src/prisma/prisma.service");
const enums_1 = require("../src/common/enums/enums");
const client_1 = require("@prisma/client");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    calcularAlerta(quantidadeAtual, quantidadeMinima) {
        if (quantidadeMinima === 0)
            return enums_1.NivelAlerta.VERDE;
        const percentual = quantidadeAtual / quantidadeMinima;
        if (percentual >= 1)
            return enums_1.NivelAlerta.VERDE;
        if (percentual >= 0.6)
            return enums_1.NivelAlerta.AMARELO;
        return enums_1.NivelAlerta.VERMELHO;
    }
    async getDashboard() {
        const [itens, saidasUltimos30dias] = await Promise.all([
            this.prisma.item.findMany(),
            this.prisma.transacao.findMany({
                where: {
                    tipo: client_1.TipoTransacao.SAIDA,
                    data: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
                },
                include: { item: true },
            }),
        ]);
        const resumoAlertas = { verde: 0, amarelo: 0, vermelho: 0 };
        for (const item of itens) {
            const nivel = this.calcularAlerta(item.quantidadeAtual, item.quantidadeMinima);
            if (nivel === enums_1.NivelAlerta.VERDE)
                resumoAlertas.verde++;
            else if (nivel === enums_1.NivelAlerta.AMARELO)
                resumoAlertas.amarelo++;
            else
                resumoAlertas.vermelho++;
        }
        const saidasPorItem = new Map();
        for (const transacao of saidasUltimos30dias) {
            const existing = saidasPorItem.get(transacao.itemId);
            if (existing) {
                existing.totalSaida += transacao.quantidade;
            }
            else {
                saidasPorItem.set(transacao.itemId, {
                    nome: transacao.item.nome,
                    totalSaida: transacao.quantidade,
                    unidadeMedida: transacao.item.unidadeMedida,
                });
            }
        }
        const topSaidas = Array.from(saidasPorItem.values())
            .sort((a, b) => b.totalSaida - a.totalSaida)
            .slice(0, 10);
        const itensCriticos = itens
            .map((item) => ({
            nome: item.nome,
            unidadeMedida: item.unidadeMedida,
            quantidadeAtual: item.quantidadeAtual,
            quantidadeMinima: item.quantidadeMinima,
            percentual: item.quantidadeMinima > 0
                ? Math.round((item.quantidadeAtual / item.quantidadeMinima) * 100)
                : 100,
            nivelAlerta: this.calcularAlerta(item.quantidadeAtual, item.quantidadeMinima),
        }))
            .filter((item) => item.nivelAlerta !== enums_1.NivelAlerta.VERDE)
            .sort((a, b) => a.percentual - b.percentual)
            .slice(0, 10);
        return {
            resumoAlertas,
            topSaidas,
            itensCriticos,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map