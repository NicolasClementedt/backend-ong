import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TipoMovimentacao } from '../../common/enums';
import { Item } from '../../item/entities/item.entity';

@Entity('movimentacoes')
export class Movimentacao {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'item_id' })
  itemId!: string;

  @Column({
    type: 'enum',
    enum: TipoMovimentacao,
  })
  tipo!: TipoMovimentacao;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  quantidade!: number;

  @Column({ type: 'varchar', length: 200 })
  motivo!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  origem!: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  destino!: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  responsavel!: string;

  @Column({ type: 'text', nullable: true })
  observacoes!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lote!: string;

  @Column({ type: 'date', nullable: true, name: 'data_validade' })
  dataValidade!: Date;

  @Column({ type: 'date', nullable: true, name: 'cesta_montada_id' })
  cestaMontadaId!: string;

  @Column({ type: 'date', name: 'data_movimentacao' })
  dataMovimentacao!: Date;

  @ManyToOne(() => Item, (item) => item.movimentacoes)
  @JoinColumn({ name: 'item_id' })
  item!: Item;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm!: Date;
}
