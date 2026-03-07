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
exports.ItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const enums_1 = require("../../common/enums/enums");
let ItemService = class ItemService {
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
    toResponse(item) {
        return {
            id: item.id,
            nome: item.nome,
            categoria: item.categoria,
            unidadeMedida: item.unidadeMedida,
            quantidadeMinima: item.quantidadeMinima,
            quantidadeAtual: item.quantidadeAtual,
            nivelAlerta: this.calcularAlerta(item.quantidadeAtual, item.quantidadeMinima),
        };
    }
    async create(dto) {
        const item = await this.prisma.item.create({ data: dto });
        return this.toResponse(item);
    }
    async findAll(categoria) {
        const items = await this.prisma.item.findMany({
            where: categoria ? { categoria: categoria } : undefined,
            orderBy: { nome: 'asc' },
        });
        return items.map(this.toResponse.bind(this));
    }
    async findOne(id) {
        const item = await this.prisma.item.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Item ${id} não encontrado :(`);
        return this.toResponse(item);
    }
    async update(id, dto) {
        await this.findOne(id);
        const item = await this.prisma.item.update({ where: { id }, data: dto });
        return this.toResponse(item);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.item.delete({ where: { id } });
        return { message: `Item ${id} removido com sucesso! :)` };
    }
};
exports.ItemService = ItemService;
exports.ItemService = ItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ItemService);
//# sourceMappingURL=item.service.js.map