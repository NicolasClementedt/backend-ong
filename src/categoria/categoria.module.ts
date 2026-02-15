import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [],
  providers: [],
  exports: [],
})
export class CategoriaModule {}
