import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from '../../item/entities/item.entity';

@Entity('estoque')
export class Estoque {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'item_id', unique: true })
  itemId!: string;

  @Column({ type: 'decimal', precision: 10, scale: 3, default: 0 })
  quantidade!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    default: 0,
    comment: 'Quantidade reservada para cestas em preparação',
    name: 'quantidade_reservada',
  })
  quantidadeReservada!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    default: 0,
    comment: 'Calculado: quantidade - reservada',
    name: 'quantidade_disponivel',
  })
  quantidadeDisponivel!: number;

  @Column({ type: 'date', nullable: true, name: 'data_validade' })
  dataValidade!: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lote!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    default: 0,
    comment: 'Média de saida diária nos últimos 30 dias',
    name: 'media_saida_diaria',
  })
  mediaSaidaDiaria!: number;

  @Column({
    type: 'int',
    nullable: true,
    comment: 'Dias de estoque disponível na média de consumo',
    name: 'dias_estoque',
  })
  diasEstoque!: number;

  @OneToOne(() => Item, (item) => item.estoque)
  @JoinColumn({ name: 'item_id' })
  item!: Item;

  @UpdateDateColumn({ name: 'ultima_atualizacao' })
  ultimaAtualizacao!: Date;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm!: Date;
}
