import { Module } from "@nestjs/common";
import { Produtos } from "./entities/produtos.entity";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [TypeOrmModule.forFeature([Produtos])],
    controllers: [],
    providers: [],
    exports: []
})

export class ProdutosModule {}