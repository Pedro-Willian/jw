import { EntityRepository, Repository } from 'typeorm';
import { Grupo } from './grupo.entity';

@EntityRepository(Grupo)
export class GrupoRepository extends Repository<Grupo> {
  async listGrupo(congregacaoId: string) {
    const [grupos, total] = await this.createQueryBuilder('grupo')
      .select([
        'grupo',
        'localizacao',
        'dirigente.id',
        'dirigente.nomeExibicao',
        'ajudante.id',
        'ajudante.nomeExibicao',
      ])
      .leftJoin('grupo.localizacao', 'localizacao')
      .leftJoin('grupo.dirigente', 'dirigente')
      .leftJoin('grupo.ajudante', 'ajudante')
      .where('grupo.congregacao = :congregacaoId', { congregacaoId })
      .orderBy('grupo.nome')
      .getManyAndCount();

    return { grupos, total };
  }

  async createGrupo(grupo: Grupo) {
    return await grupo.save();
  }

  async updateGrupo(grupo: Grupo) {
    return await grupo.save();
  }

  async deleteGrupo(grupoId: string, congregacaoId: string) {
    return await this.createQueryBuilder('grupo')
      .delete()
      .where('congregacao = :congregacaoId', { congregacaoId })
      .andWhere('id = :grupoId', { grupoId })
      .execute();
  }
}
