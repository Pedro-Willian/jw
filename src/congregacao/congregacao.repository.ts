import { EntityRepository, Repository } from 'typeorm';
import { Congregacao } from './congregacao.entity';

@EntityRepository(Congregacao)
export class CongregacaoRepository extends Repository<Congregacao> {
  async findCongregacoes() {
    const query = this.createQueryBuilder('congregacao');

    //query.select(['congregacao.nome']);

    const [congregacoes, total] = await query.getManyAndCount();

    return { congregacoes, total };
  }
}
