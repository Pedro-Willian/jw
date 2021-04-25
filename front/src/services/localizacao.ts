import { Localizacao } from 'entities/localizacao';
import { ResponseList } from './types-request';

// TODO esse é um metodo temporario, deve ser alterado para acessar o back
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getLocalizacao = (congregacaoId: string) =>
  new Promise<ResponseList<'localizacoes', Localizacao>>((resolve) =>
    resolve({
      localizacoes: [
        {
          id: 'd07f6a62-17c9-4994-ae3c-6efae779bd7e',
          nome: 'local2',
        } as Localizacao,
        {
          id: '606771bb-0e63-4593-b6db-1a861432bcdd',
          nome: 'local1',
        } as Localizacao,
      ],
      total: 2,
    }),
  );

export { getLocalizacao };
