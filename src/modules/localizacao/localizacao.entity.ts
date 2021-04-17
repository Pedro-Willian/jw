import {
  Entity,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Congregacao } from '~modules/congregacao/congregacao.entity';
import { Grupo } from '~modules/grupo/grupo.entity';

@Entity()
export class Localizacao extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: true, type: 'text', length: 200 })
  endereco: string;

  @ManyToOne((_) => Congregacao, (congregacao) => congregacao.id)
  congregacao: Congregacao;

  @OneToMany((_) => Grupo, (grupo) => grupo.localizacao)
  grupos: Grupo[];
}
