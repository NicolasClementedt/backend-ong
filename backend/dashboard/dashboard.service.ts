import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { NivelAlerta } from '../src/common/enums/enums';

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
}
