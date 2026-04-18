import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NivelAlerta } from '../common/enums/enums';
import { TipoTransacao } from '@prisma/client';

@Injectable()
export class DashboardService {
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

  async getDashboard() {
    const [itens, saidasUltimos30dias] = await Promise.all([
      //pega todos os itens
      this.prisma.item.findMany(),

      //pega todas as transações de saída nos ultimos 30 dias
      this.prisma.transacao.findMany({
        where: {
          tipo: TipoTransacao.SAIDA,
          data: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
        include: { item: true },
      }),
    ]);

    //1 - Resumo de todos os Alertas
    const resumoAlertas = { verde: 0, amarelo: 0, vermelho: 0 };
    for (const item of itens) {
      const nivel = this.calcularAlerta(
        item.quantidadeAtual,
        item.quantidadeMinima,
      );
      if (nivel === NivelAlerta.VERDE) resumoAlertas.verde++;
      else if (nivel === NivelAlerta.AMARELO) resumoAlertas.amarelo++;
      else resumoAlertas.vermelho++;
    }

    //2 - Top 10 itens com mais saída nos últimos 30 dias
    const saidasPorItem = new Map<
      string,
      { nome: string; totalSaida: number; unidadeMedida: string }
    >();
    for (const transacao of saidasUltimos30dias) {
      const existing = saidasPorItem.get(transacao.itemId);
      if (existing) {
        existing.totalSaida += transacao.quantidade;
      } else {
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

    // 3 - Top 10 itens mais necessários
    const itensCriticos = itens
      .map((item) => ({
        nome: item.nome,
        unidadeMedida: item.unidadeMedida,
        quantidadeAtual: item.quantidadeAtual,
        quantidadeMinima: item.quantidadeMinima,
        percentual:
          item.quantidadeMinima > 0
            ? Math.round((item.quantidadeAtual / item.quantidadeMinima) * 100)
            : 100,
        nivelAlerta: this.calcularAlerta(
          item.quantidadeAtual,
          item.quantidadeMinima,
        ),
      }))
      .filter((item) => item.nivelAlerta !== NivelAlerta.VERDE)
      .sort((a, b) => a.percentual - b.percentual)
      .slice(0, 10);

    return {
      resumoAlertas,
      topSaidas,
      itensCriticos,
    };
  }
}
