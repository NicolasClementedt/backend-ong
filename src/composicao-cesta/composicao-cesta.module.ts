import { Module } from '@nestjs/common';
import { ComposicaoCestaService } from './composicao-cesta.service';
import { ComposicaoCestaController } from './composicao-cesta.controller';

@Module({
  controllers: [ComposicaoCestaController],
  providers: [ComposicaoCestaService],
})
export class ComposicaoCestaModule {}
