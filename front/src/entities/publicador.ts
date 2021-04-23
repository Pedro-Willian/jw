import { Genero } from 'enum/genero';
import { Permissao } from 'enum/permissao';
import { Pioneiro } from 'enum/pioneiro';
import { Privilegio } from 'enum/privilegio';
import { SalasVMC } from 'enum/sala-vmc';
import type { Congregacao } from './congregacao';
import type { Grupo } from './grupo';

export type Publicador = {
  id: string;

  // ----------Dados basicos
  nome: string;
  sobrenome: string;
  nomeExibicao: string;
  telefoneRes: string;
  telefoneCel: string;
  telefoneTra: string;
  endereco: string;
  email: string;
  dataNasc: string;
  chefeFamilia: boolean;
  familia: string;
  genero: Genero;
  idoso: boolean;
  surdo: boolean;
  crianca: boolean;
  cego: boolean;
  notas: string;
  congregacao: Congregacao;

  // ----------Dados espirituais
  grupo: Grupo;
  privilegio: Privilegio;
  datismo: string;
  primeiroRelatorio: string;
  pioneiro: Pioneiro;
  ultimaEscola: string;
  ativo: boolean;
  regular: boolean;
  estudanteVMC: boolean;
  estudanteVMCSala: SalasVMC;
  ungido: boolean;
  LDC: string;
  chaveSalao: boolean;
  readmissao: string;
  reportaFilial: boolean;
  desassociacao: string;
  mudou: boolean;

  // ----------Dados designação
  // >>>>>>>>>>>>>>> Tesouros
  presidenteMeioSemana: boolean;
  presidenteSalaB: boolean;
  oracao: boolean;
  discursoTesouro: boolean;
  joias: boolean;
  leituraBiblia: boolean;
  // >>>>>>>>>>>>>>> Faça melhor ministerio
  primeiraConversa: boolean;
  revisita: boolean;
  estudoBiblico: boolean;
  ajudanteVMC: boolean;
  discursoVMC: boolean;
  // >>>>>>>>>>>>>>> Nossa vida cristã
  partes: boolean;
  EBC: boolean;
  // >>>>>>>>>>>>>>> Campo
  testemunhoPublico: boolean;
  dirigenteCampo: boolean;
  oracaoCampo: boolean;
  // >>>>>>>>>>>>>>> Responsabilidades
  indicador: boolean;
  seguranca: boolean;
  microfone: boolean;
  som: boolean;
  video: boolean;
  operadorZoom: boolean;
  capitaoJardim: boolean;
  // >>>>>>>>>>>>>>> Discursos públicos
  oradorLocal: boolean;
  oradorFora: boolean;
  discursos: number[];
  frequenciaDiscurso: number;
  presidenteFinalSemana: boolean;
  leitorSentinela: boolean;
  hospitalidade: boolean;

  // ----------Permissões de edição
  // >>>>>>>>>>>>>>> Congregacao
  adminMaster: boolean;
  informacoesCongregacao: Permissao;
  eventos: Permissao;
  anuncios: Permissao;
  relatoriosServicoCampo: Permissao;
  familias: Permissao;
  grupos: Permissao;
  assistenciaReunioes: Permissao;
  designacoesCongregacao: Permissao;
  registroDesignacaoTerritorio: Permissao;
  // >>>>>>>>>>>>>>> Publicadores
  informacoesPublicadores: Permissao;
  designacoesPublicadores: Permissao;
  registrosPublicadores: Permissao;
  // >>>>>>>>>>>>>>> Programação
  reuniaoVidaMinisterio: Permissao;
  discursosPublicos: Permissao;
  servicoCampo: Permissao;
  resposabilidades: Permissao;
  limpeza: Permissao;
  visitaSuperCircuito: Permissao;
};
