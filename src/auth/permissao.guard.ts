import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NomePermissao, Permissao } from '~enum/permissao';
import { PublicadorRepository } from '~modules/publicador/publicador.repository';

export type RolePermissao = {
  nomePermissao: NomePermissao;
  permissao: Permissao;
};

/** O parametro `role` quando for array será encarado como OR no sql */
export const Roles = (role: RolePermissao | RolePermissao[]) =>
  SetMetadata('role', role);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => PublicadorRepository))
    private publicadorRepository: PublicadorRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const role = this.reflector.get<RolePermissao | RolePermissao[]>(
      'role',
      context.getHandler(),
    );
    const {
      user,
      body,
      query,
      method,
    }: {
      user: { userId: string };
      body: { congregacaoId: string };
      query: { congregacaoId: string };
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    } = context.switchToHttp().getRequest();

    if (!role || !user) {
      // eslint-disable-next-line no-console
      console.warn(!role ? 'Regra não informada' : 'Usuário não logado');
      return false;
    }
    if (
      (method === 'POST' || method === 'PUT' || method === 'PATCH') &&
      !body.congregacaoId
    ) {
      // eslint-disable-next-line no-console
      console.warn('congregacaoId não informado no corpo da requisição');
      return false;
    }
    if ((method === 'GET' || method === 'DELETE') && !query.congregacaoId) {
      // eslint-disable-next-line no-console
      console.warn('congregacaoId não informado na query string');
      return false;
    }
    const publicador = await this.publicadorRepository.findOneHasPermissao(
      user.userId,
      role,
      body.congregacaoId || query.congregacaoId,
    );
    // eslint-disable-next-line no-console
    if (!publicador) console.warn('Usuário não tem permissão para fazer isso');

    return publicador;
  }
}
