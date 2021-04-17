import {
  Entity,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Periodo } from '~enum/periodo';
import { Semana } from '~enum/semana';
import { Congregacao } from '~modules/congregacao/congregacao.entity';
import { Localizacao } from '~modules/localizacao/localizacao.entity';
import { Publicador } from '~modules/publicador/publicador.entity';

@Entity()
export class Grupo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, enum: Semana })
  dia: Semana;

  @Column({ nullable: false, enum: Periodo })
  periodo: Periodo;

  @Column({ nullable: false, type: 'time' })
  horario: string;

  @ManyToOne((_) => Localizacao, (localizacao) => localizacao.id)
  localizacao: Localizacao;

  @ManyToOne((_) => Congregacao, (congregacao) => congregacao.id)
  congregacao: Congregacao;

  @OneToMany((_) => Publicador, (publicador) => publicador.congregacao)
  publicadores: Publicador[];
}
