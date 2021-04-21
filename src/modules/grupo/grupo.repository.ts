import { EntityRepository, Repository } from 'typeorm';
import { Grupo } from './grupo.entity';

@EntityRepository(Grupo)
export class GrupoRepository extends Repository<Grupo> {
  async listGrupo(congregacaoId: string) {
    const [grupos, total] = await this.createQueryBuilder('grupo')
      .where('grupo.congregacao = :congregacaoId', { congregacaoId })
      .getManyAndCount();

    return { grupos, total };
  }

  async createGrupo(grupo: Grupo) {
    return await grupo.save();
  }
}
