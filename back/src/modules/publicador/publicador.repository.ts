import { Brackets, EntityRepository, Repository } from 'typeorm';
import { RolePermissao } from '~auth/permissao.guard';
import { Publicador } from './publicador.entity';

@EntityRepository(Publicador)
export class PublicadorRepository extends Repository<Publicador> {
  async findPublicadores() {
    const [publicadores, total] = await this.createQueryBuilder('publicador')
      .select(['publicador.nome'])
      .getManyAndCount();

    return { publicadores, total };
  }

  async findById(id: string) {
    return this.createQueryBuilder('publicador')
      .select(['publicador', 'congregacao.id', 'congregacao.nome'])
      .leftJoin('publicador.congregacao', 'congregacao')
      .where('publicador.id = :id', { id })
      .getOne();
  }

  async findByCongregacaoAndPin(congregacaoId: string, pin: string) {
    return this.createQueryBuilder('publicador')
      .leftJoinAndSelect('publicador.congregacao', 'congregacao')
      .addSelect('publicador.pin')
      .addSelect('congregacao.senha')
      .where('publicador.congregacao = :id', { id: congregacaoId })
      .andWhere('publicador.pin = :pin', { pin })
      .getOne();
  }

  async findOneHasPermissao(
    publicadorId: string,
    role: RolePermissao | RolePermissao[],
    congregacaoId: string,
  ) {
    const query = this.createQueryBuilder('publicador')
      .where('publicador.id = :publicadorId', { publicadorId })
      .andWhere('publicador.congregacao = :congregacaoId', { congregacaoId });

    if (Array.isArray(role))
      query.andWhere(
        new Brackets((qb) => {
          role.forEach((r, i) => {
            const obj: Record<string, string> = {};
            obj[`permissao${i}`] = r.permissao;
            qb.orWhere(`publicador.${r.nomePermissao} = :permissao${i}`, obj);
          });
        }),
      );
    else
      query.andWhere(`publicador.${role.nomePermissao} = :permissao`, {
        ...role,
      });

    return !!(await query.getOne());
  }
}
