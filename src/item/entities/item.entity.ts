import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UnidadeMedida } from '../../common/enums';
import { Subcategoria } from '../../subcategoria/entities/subcategoria.entity';

@Entity('itens')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'sub_categoria_id' })
  subCategoriaId!: string;

  @Column({ type: 'varchar', length: 200 })
  nome!: string;

  @Column({ type: 'text', nullable: true })
  descricao!: string;

  @Column({
    type: 'enum',
    enum: UnidadeMedida,
    default: UnidadeMedida.UNIDADE,
    name: 'unidade_medida',
  })
  unidadeMedida!: UnidadeMedida;

  @Column({ type: 'boolean', default: false })
  perecivel!: boolean;

  @Column({
    type: 'int',
    nullable: true,
    comment: 'Dias médios de validade para itens perecíveis',
    name: 'dias_validade_media',
  })
  diasValidadeMedia!: number;

  @Column({
    type: 'int',
    default: 5,
    comment: 'Valor nutricional/importância de 1-10',
    name: 'valor_nutricional',
  })
  valorNutricional!: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 5.0,
    comment: 'Facilidade de arrecadcão baseada em histórico (1-10)',
    name: 'facilidade_arrecadacao',
  })
  facilidadeArrecadacao!: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marca!: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    comment: 'URL da imagem do item',
  })
  imagemUrl!: string;

  @Column({ type: 'boolean', default: true })
  ativo!: boolean;

  @ManyToOne(() => Subcategoria, (Subcategoria) => Subcategoria.items)
  @JoinColumn({ name: 'sub_categoria_id' })
  subCategoria!: Subcategoria;

  @OneToOne(() => Estoque, (estoque) => estoque.item)
  estoque!: Estoque;

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.item)
  movimentacoes!: Movimentacao[];

  @OneToMany(() => ItemCesta, (itemCesta) => itemCesta.item)
  itemCestas!: ItemCesta[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm!: Date;
}
