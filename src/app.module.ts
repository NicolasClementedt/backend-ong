import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { SubcategoriaModule } from './subcategoria/subcategoria.module';
import { Subcategoria } from './subcategoria/entities/subcategoria.entity';
import { ItemModule } from './item/item.module';
import { EstoqueModule } from './estoque/estoque.module';
import { MovimentacaoModule } from './movimentacao/movimentacao.module';
import { ComposicaoCestaModule } from './composicao-cesta/composicao-cesta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'db_estoquecube',
      entities: [Categoria, Subcategoria],
      synchronize: true,
      logging: true,
    }),
    CategoriaModule,
    SubcategoriaModule,
    ItemModule,
    EstoqueModule,
    MovimentacaoModule,
    ComposicaoCestaModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
