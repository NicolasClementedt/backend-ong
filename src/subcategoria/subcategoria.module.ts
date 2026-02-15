import { Module } from '@nestjs/common';
import { SubcategoriaService } from './subcategoria.service';
import { SubcategoriaController } from './subcategoria.controller';

@Module({
  controllers: [SubcategoriaController],
  providers: [SubcategoriaService],
})
export class SubcategoriaModule {}
