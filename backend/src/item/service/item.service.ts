import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NivelAlerta } from '../../common/enums/enums';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  private calcularAlerta(
    quantidadeAtual: number,
    quantidadeMinima: number,
  ): NivelAlerta {
    if (quantidadeMinima === 0) return NivelAlerta.VERDE;
    const percentual = quantidadeAtual / quantidadeMinima;
    if (percentual >= 1) return NivelAlerta.VERDE;
    if (percentual >= 0.6) return NivelAlerta.AMARELO;
    return NivelAlerta.VERMELHO;
  }

  private toResponse(item: any) {
    return {
      id: item.id,
      nome: item.nome,
      categoria: item.categoria,
      unidadeMedida: item.unidadeMedida,
      quantidadeMinima: item.quantidadeMinima,
      quantidadeAtual: item.quantidadeAtual,
      nivelAlerta: this.calcularAlerta(
        item.quantidadeAtual,
        item.quantidadeMinima,
      ),
    };
  }

  async create(dto: CreateItemDto) {
    const item = await this.prisma.item.create({ data: dto });
    return this.toResponse(item);
  }

  async findAll(categoria?: string) {
    const items = await this.prisma.item.findMany({
      where: categoria ? { categoria: categoria as any } : undefined,
      orderBy: { nome: 'asc' },
    });
    return items.map(this.toResponse.bind(this));
  }

  async findOne(id: string) {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Item ${id} não encontrado :(`);
    return this.toResponse(item);
  }

  async update(id: string, dto: UpdateItemDto) {
    await this.findOne(id);
    const item = await this.prisma.item.update({ where: { id }, data: dto });
    return this.toResponse(item);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.item.delete({ where: { id } });
    return { message: `Item ${id} removido com sucesso! :)` };
  }
}
