import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TipoCategoria } from '../../common/enums';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nome!: string;

  @Column({
    type: 'enum',
    enum: TipoCategoria,
    default: TipoCategoria.OUTRO,
  })
  tipo!: TipoCategoria;

  @Column({ type: 'varchar', length: 50, nullable: true })
  icone!: string;

  @Column({ type: 'text', nullable: true })
  descricao!: string;

  @Column({ type: 'boolean', default: true })
  ativa!: boolean;

  @OneToMany(() => SubCategoria, (subCategoria) => subCategoria.categoria)
  subCategorias: SubCategoria[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm!: Date;
}
