import { Publicador } from 'entities/publicador';
import { ResponseList } from './types-request';

// TODO esse é um metodo temporario, deve ser alterado para acessar o back
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPublicadores = (congregacaoId: string, filtro: string[]) =>
  new Promise<ResponseList<'publicadores', Publicador>>((resolve) =>
    resolve({
      publicadores: [
        {
          id: '7f91fa8a-50bb-4c49-bbd3-356f933262fa',
          nomeExibicao: 'abc qwe',
        } as Publicador,
        {
          id: 'c7b1d33e-c6fc-42f6-bbfb-4420d2b2c32f',
          nomeExibicao: 'zxc cvb',
        } as Publicador,
      ],
      total: 2,
    }),
  );

export { getPublicadores };
