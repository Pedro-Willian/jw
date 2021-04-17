import { Entity, Column, BaseEntity, OneToMany, Unique } from 'typeorm';
import { Publicador } from '../publicador/publicador.entity';

export enum Semana {
  DOMINGO = 'DOMINGO',
  SEGUNDA = 'SEGUNDA',
  TERCA = 'TERCA',
  QUARTA = 'QUARTA',
  QUINTA = 'QUINTA',
  SEXTA = 'SEXTA',
  SABADO = 'SABADO',
}

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

  @Column({ nullable: false, type: 'varchar', length: 200 })
  senha: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'int' })
  numero: number;

  @Column({ nullable: false, enum: Semana })
  reuniaoFinalSemanaDia: Semana;

  @Column({ nullable: false, type: 'time' })
  reuniaoFinalSemanaHorario: string;

  @Column({ nullable: false, enum: Semana })
  reuniaoMeioSemanaDia: Semana;

  @Column({ nullable: false, type: 'time' })
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
}
