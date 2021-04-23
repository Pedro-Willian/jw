import type { Congregacao } from './congregacao';
import type { Grupo } from './grupo';

export type Localizacao = {
  id: string;
  nome: string;
  endereco: string;
  congregacao: Congregacao;
  grupos: Grupo[];
};
