import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Unique,
  JoinTable,
} from 'typeorm';
import { Congregacao } from '../congregacao/congregacao.entity';

export enum Genero {
  MASCULINO = 'M',
  FEMININO = 'F',
}

export enum Privilegio {
  ANCIAO = 'ANCIAO',
  SERVO = 'SERVO',
  PUBLICADOR = 'PUBLICADOR',
  PUBLICADOR_NB = 'PUBLICADOR_NB',
  NAO = 'NAO',
}

export enum Pioneiro {
  NAO = 'NAO',
  AUX_CONTINUO = 'AUX_CONTINUO',
  PIO_REGULAR = 'PIO_REGULAR',
  PIO_ESPECIAL = 'PIO_ESPECIAL',
}

export enum SalasVMC {
  TODAS = 'TODAS',
  A = 'B',
  B = 'B',
}

@Entity()
@Unique(['pin', 'congregacao'])
export class Publicador extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int' })
  pin: number;

  /////////// Dados basicos
  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  sobrenome: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nomeExibicao: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  telefoneRes: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  telefoneCel: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  telefoneTra: string;

  @Column({ nullable: true, type: 'text' })
  endereco: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  dataNasc: string;

  @Column({ nullable: true, type: 'boolean' })
  chefeFamilia: boolean;

  @Column({ nullable: true, type: 'uuid' })
  familia: string;

  @Column({ nullable: true, enum: Genero, default: Genero.MASCULINO })
  genero: Genero;

  @Column({ nullable: true, type: 'boolean' })
  idoso: boolean;

  @Column({ nullable: true, type: 'boolean' })
  surdo: boolean;

  @Column({ nullable: true, type: 'boolean' })
  crianca: boolean;

  @Column({ nullable: true, type: 'boolean' })
  cego: boolean;

  @Column({ nullable: true, type: 'text' })
  notas: string;

  @ManyToOne((_) => Congregacao, (congregacao) => congregacao.id)
  congregacao: Congregacao;

  /////////// Dados espirituais
  @Column({ nullable: true, type: 'uuid' })
  grupo: string;

  @Column({ enum: Privilegio, default: Privilegio.PUBLICADOR })
  privilegio: Privilegio;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  datismo: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  primeiroRelatorio: string;

  @Column({ enum: Pioneiro, default: Pioneiro.NAO })
  pioneiro: Pioneiro;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  ultimaEscola: string;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @Column({ type: 'boolean', default: true })
  regular: boolean;

  @Column({ nullable: true, type: 'boolean' })
  estudanteVMC: boolean;

  @Column({ enum: SalasVMC, default: SalasVMC.TODAS })
  estudanteVMCSala: SalasVMC;

  @Column({ nullable: true, type: 'boolean' })
  ungido: boolean;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  LDC: string;

  @Column({ nullable: true, type: 'boolean' })
  chaveSalao: boolean;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  readmissao: string;

  @Column({ nullable: true, type: 'boolean' })
  reportaFilial: boolean;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  desassociacao: string;

  /////////// Dados designação
  ///////////---- Tesouros
  @Column({ nullable: true, type: 'boolean' })
  presidenteMeioSemana: boolean;

  @Column({ nullable: true, type: 'boolean' })
  presidenteSalaB: boolean;

  @Column({ nullable: true, type: 'boolean' })
  oracao: boolean;

  @Column({ nullable: true, type: 'boolean' })
  discursoTesouro: boolean;

  @Column({ nullable: true, type: 'boolean' })
  joias: boolean;

  @Column({ nullable: true, type: 'boolean' })
  leituraBiblia: boolean;

  ///////////---- Faça melhor ministerio
  @Column({ nullable: true, type: 'boolean' })
  primeiraConversa: boolean;

  @Column({ nullable: true, type: 'boolean' })
  revisita: boolean;

  @Column({ nullable: true, type: 'boolean' })
  estudoBiblico: boolean;

  @Column({ nullable: true, type: 'boolean' })
  ajudanteVMC: boolean;

  @Column({ nullable: true, type: 'boolean' })
  discursoVMC: boolean;

  ///////////---- Nossa vida cristã
  @Column({ nullable: true, type: 'boolean' })
  partes: boolean;

  @Column({ nullable: true, type: 'boolean' })
  EBC: boolean;

  ///////////---- Campo
  @Column({ nullable: true, type: 'boolean' })
  testemunhoPublico: boolean;

  @Column({ nullable: true, type: 'boolean' })
  dirigenteCampo: boolean;

  @Column({ nullable: true, type: 'boolean' })
  oracaoCampo: boolean;

  ///////////---- Responsabilidades
  @Column({ nullable: true, type: 'boolean' })
  indicador: boolean;

  @Column({ nullable: true, type: 'boolean' })
  seguranca: boolean;

  @Column({ nullable: true, type: 'boolean' })
  microfone: boolean;

  @Column({ nullable: true, type: 'boolean' })
  som: boolean;

  @Column({ nullable: true, type: 'boolean' })
  video: boolean;

  @Column({ nullable: true, type: 'boolean' })
  operadorZoom: boolean;

  @Column({ nullable: true, type: 'boolean' })
  capitaoJardim: boolean;

  ///////////---- Discursos públicos
  @Column({ nullable: true, type: 'boolean' })
  oradorLocal: boolean;

  @Column({ nullable: true, type: 'boolean' })
  oradorFora: boolean;

  @Column({ nullable: true, type: 'smallint', array: true })
  discursos: number[];

  @Column({ nullable: true, type: 'smallint' })
  frequenciaDiscurso: number;

  @Column({ nullable: true, type: 'boolean' })
  presidenteFinalSemana: boolean;

  @Column({ nullable: true, type: 'boolean' })
  leitorSentinela: boolean;

  @Column({ nullable: true, type: 'boolean' })
  hospitalidade: boolean;
}
