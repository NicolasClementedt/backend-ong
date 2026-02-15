import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { IsNotEmpty } from "class-validator";


@Entity()
export class Produtos {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 100, nullable:false})
    nome: string;

    @IsNotEmpty()
    @Column({type: "decimal", nullable:false})
    preco: number;

    @IsNotEmpty()
    @Column({type: "bigint", nullable:false})
    quantidade: number;

     @IsNotEmpty()
    @Column({type: "bigint", nullable:false})
    categoriaId: number;

    @ManyToOne(() => Categoria, categoria => categoria.produtos)
    categoria: Categoria;
    
}