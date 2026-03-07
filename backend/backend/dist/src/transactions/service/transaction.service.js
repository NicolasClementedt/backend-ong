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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require(".prisma/client");
let TransactionService = class TransactionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const item = await this.prisma.item.findUnique({
            where: { id: dto.itemId },
        });
        if (!item)
            throw new common_1.NotFoundException(`item ${dto.itemId} não encontrado :(`);
        if (dto.tipo === client_1.TipoTransacao.SAIDA &&
            item.quantidadeAtual < dto.quantidade) {
            throw new common_1.BadRequestException(`Estoque insuficiente. Disponível: ${item.quantidadeAtual} ${item.unidadeMedida}`);
        }
        if (dto.tipo === client_1.TipoTransacao.SAIDA && !dto.categoriaDestino) {
            throw new common_1.BadRequestException(`Destino da transação de saída precisa ser preenchido`);
        }
        const [transacao] = await this.prisma.$transaction([
            this.prisma.transacao.create({
                data: {
                    itemId: dto.itemId,
                    tipo: dto.tipo,
                    quantidade: dto.quantidade,
                    observacao: dto.observacao,
                    categoriaDestino: dto.categoriaDestino,
                    descricaoDestino: dto.descricaoDestino,
                    data: dto.data ? new Date(dto.data) : new Date(),
                    usuarioId: null,
                },
                include: { item: true },
            }),
            this.prisma.item.update({
                where: { id: dto.itemId },
                data: {
                    quantidadeAtual: dto.tipo === client_1.TipoTransacao.ENTRADA
                        ? item.quantidadeAtual + dto.quantidade
                        : item.quantidadeAtual - dto.quantidade,
                },
            }),
        ]);
        return transacao;
    }
    async findAll(filters) {
        return this.prisma.transacao.findMany({
            where: {
                ...(filters.itemId && { itemId: filters.itemId }),
                ...(filters.tipo && { tipo: filters.tipo }),
                ...(filters.dataInicio || filters.dataFim
                    ? {
                        data: {
                            ...(filters.dataInicio && {
                                gte: new Date(filters.dataInicio),
                            }),
                            ...(filters.dataFim && { lte: new Date(filters.dataFim) }),
                        },
                    }
                    : {}),
            },
            include: { item: true },
            orderBy: { data: 'desc' },
        });
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map