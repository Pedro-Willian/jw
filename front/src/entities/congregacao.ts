import { Semana } from 'enum/semana';
import type { Grupo } from './grupo';
import type { Localizacao } from './localizacao';
import type { Publicador } from './publicador';

export type Congregacao = {
  id: string;
  senha: string;
  nome: string;
  numero: number;
  reuniaoFinalSemanaDia: Semana;
  reuniaoFinalSemanaHorario: string;
  reuniaoMeioSemanaDia: Semana;
  reuniaoMeioSemanaHorario: string;
  zoomId: string;
  zoomSenha: string;
  zoomLink: string;
  enderecoSalao: string;
  circuito: string;
  nomeSC: string;
  publicadores: Publicador[];
  grupos: Grupo[];
  localizacao: Localizacao[];
};
