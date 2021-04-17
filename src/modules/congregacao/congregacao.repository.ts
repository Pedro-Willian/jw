import { EntityRepository, Repository } from 'typeorm';
import { Congregacao } from './congregacao.entity';

@EntityRepository(Congregacao)
export class CongregacaoRepository extends Repository<Congregacao> {
  async findCongregacoes() {
    const [congregacoes, total] = await this.createQueryBuilder(
      'congregacao',
    ).getManyAndCount();

    return { congregacoes, total };
  }
}
