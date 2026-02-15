import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { Produtos } from './produto/entities/produtos.entity';
import { ProdutosModule } from './produto/produtos.module';
import { CategoriaModule } from './categoria/categoria.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'db_estoquecube',
      entities: [Produtos, Categoria],
      synchronize: true,
      logging: true,
    }),
    ProdutosModule,
    CategoriaModule,
  ], 
  
   controllers: [],
  providers: [],

})
export class AppModule {}


 

