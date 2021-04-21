import { Entity, Column, BaseEntity, OneToMany, Unique } from 'typeorm';
import { Semana } from '~enum/semana';
import { Grupo } from '~modules/grupo/grupo.entity';
import { Localizacao } from '~modules/localizacao/localizacao.entity';
import { Publicador } from '~modules/publicador/publicador.entity';

@Entity()
@Unique(['numero'])
export class Congregacao extends BaseEntity {
  @Column({
    primary: true,
    nullable: false,
    type: 'varchar',
    length: 15,
  })
  id: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  senha: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: true, type: 'int' })
  numero: number;

  @Column({ nullable: true, enum: Semana })
  reuniaoFinalSemanaDia: Semana;

  @Column({ nullable: true, type: 'time' })
  reuniaoFinalSemanaHorario: string;

  @Column({ nullable: true, enum: Semana })
  reuniaoMeioSemanaDia: Semana;

  @Column({ nullable: true, type: 'time' })
  reuniaoMeioSemanaHorario: string;

  @Column({ nullable: true, type: 'varchar', length: 15 })
  zoomId: string;

  @Column({ nullable: true, type: 'varchar', length: 15 })
  zoomSenha: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  zoomLink: string;

  @Column({ nullable: true, type: 'text' })
  enderecoSalao: string;

  @Column({ nullable: true, type: 'varchar', length: 15 })
  circuito: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  nomeSC: string;

  @OneToMany((_) => Publicador, (publicador) => publicador.congregacao)
  publicadores: Publicador[];

  @OneToMany((_) => Grupo, (grupo) => grupo.congregacao)
  grupos: Grupo[];

  @OneToMany((_) => Localizacao, (localizacao) => localizacao.congregacao)
  localizacao: Localizacao[];
}
