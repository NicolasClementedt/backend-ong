import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TipoCesta } from '../../common/enums';

@Entity('_composicoes_cestas')
export class ComposicaoCesta {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  nome!: string;

  @Column({ type: 'text', nullable: true })
  descricao!: string;

  @Column({
    type: 'enum',
    enum: TipoCesta,
    default: TipoCesta.PERSONALIZADA,
  })
  tipoCesta!: TipoCesta;

  @Column({ type: 'boolean', default: true })
  ativa!: boolean;

  @Column({
    type: 'int',
    nullable: true,
    comment: 'Quantidade de pessoas que esta cesta atende',
    name: 'numero_pessoas',
  })
  numeroPessoas!: number;

  @Column({
    type: 'int',
    nullable: true,
    comment: 'Para quantos dias esta cesta é planejada',
    name: 'dias_planejados',
  })
  diasPlanejados!: number;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    comment: 'URL da imagem da cesta',
  })
  imagemUrl!: string;

  @OneToMany(() => ItemCesta, (itemCesta) => itemCesta.composicaoCesta, {
    cascade: true,
  })
  itensCesta: ItemCesta[];

  @OneToMany(() => CestaMontada, (cestaMontada) => cestaMontada.composicaoCesta)
  cestasMontadas: CestaMontada[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm!: Date;
}
