import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity('sub_categorias')
export class Subcategoria {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'categoria_id' })
  categoriaId!: string;

  @Column({ type: 'varchar', length: 100 })
  nome!: string;

  @Column({ type: 'text', nullable: true })
  descricao!: string;

  @Column({
    type: 'int',
    default: 5,
    comment: 'Prioridade de 1-10 para ordenação',
  })
  prioridade!: number;

  @Column({ type: 'boolean', default: true })
  ativa!: boolean;

  @ManyToOne(() => Categoria, (categoria) => categoria.subCategorias)
  @JoinColumn({ name: 'categoria_id' })
  categoria!: Categoria;

  @OneToMany(() => Item, (item) => item.subCategoria)
  items: Item[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm!: Date;
}
