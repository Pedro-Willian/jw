import { Periodo } from 'enum/periodo';
import { Semana } from 'enum/semana';
import type { Congregacao } from './congregacao';
import type { Localizacao } from './localizacao';
import type { Publicador } from './publicador';

export type Grupo = {
  id: string;
  nome: string;
  dia: Semana;
  periodo: Periodo;
  horario: string;
  localizacao: Localizacao;
  congregacao: Congregacao;
  publicadores: Publicador[];
  dirigente: Publicador;
  ajudante: Publicador;
};
