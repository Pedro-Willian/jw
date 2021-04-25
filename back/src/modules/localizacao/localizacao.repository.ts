import { EntityRepository, Repository } from 'typeorm';
import { Localizacao } from './localizacao.entity';

@EntityRepository(Localizacao)
export class LocalizacaoRepository extends Repository<Localizacao> {
  async listLocalizacao(congregacaoId: string) {
    const [localizacoes, total] = await this.createQueryBuilder('localizacao')
      .where('localizacao.congregacao = :congregacaoId', { congregacaoId })
      .orderBy('localizacao.nome')
      .getManyAndCount();

    return { localizacoes, total };
  }

  async createLocalizacao(localizacao: Localizacao) {
    return await localizacao.save();
  }

  async updateLocalizacao(localizacao: Localizacao) {
    return await localizacao.save();
  }

  async deleteLocalizacao(localizacaoId: string, congregacaoId: string) {
    return await this.createQueryBuilder('localizacao')
      .delete()
      .where('congregacao = :congregacaoId', { congregacaoId })
      .andWhere('id = :localizacaoId', { localizacaoId })
      .execute();
  }
}
