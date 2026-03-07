import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TipoTransacao } from '.prisma/client';
import { FilterTransactionDto } from '../dto/filter-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    //verificar se o item existe
    const item = await this.prisma.item.findUnique({
      where: { id: dto.itemId },
    });
    if (!item)
      throw new NotFoundException(`item ${dto.itemId} não encontrado :(`);

    //verificar se o item tem estoque suficiente para saída
    if (
      dto.tipo === TipoTransacao.SAIDA &&
      item.quantidadeAtual < dto.quantidade
    ) {
      throw new BadRequestException(
        `Estoque insuficiente. Disponível: ${item.quantidadeAtual} ${item.unidadeMedida}`,
      );
    }

    //verifica o destino da transação saída
    if (dto.tipo === TipoTransacao.SAIDA && !dto.categoriaDestino) {
      throw new BadRequestException(
        `Destino da transação de saída precisa ser preenchido`,
      );
    }

    //cria e atualiza estoque em uma única operação
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
          usuarioId: null as unknown as string,
        },
        include: { item: true },
      }),
      this.prisma.item.update({
        where: { id: dto.itemId },
        data: {
          quantidadeAtual:
            dto.tipo === TipoTransacao.ENTRADA
              ? item.quantidadeAtual + dto.quantidade
              : item.quantidadeAtual - dto.quantidade,
        },
      }),
    ]);

    return transacao;
  }

  async findAll(filters: FilterTransactionDto) {
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
}
