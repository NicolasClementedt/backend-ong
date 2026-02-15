import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produtos } from "../../produto/entities/produtos.entity";
import { IsNotEmpty } from "class-validator";


@Entity()
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

   
    @IsNotEmpty()
    @Column({length: 100, nullable:false})
    nome: string;

    
    @IsNotEmpty()
    @Column({length: 1000, nullable:false})
    descricao: string;

    @OneToMany(() => Produtos, produtos => produtos.categoria)
    produtos: Produtos[];
}