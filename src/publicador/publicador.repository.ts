import { EntityRepository, Repository } from 'typeorm';
import { Publicador } from './publicador.entity';

@EntityRepository(Publicador)
export class PublicadorRepository extends Repository<Publicador> {
  async findPublicadores() {
    const [publicadores, total] = await this.createQueryBuilder('publicador')
      .select(['publicador.nome'])
      .getManyAndCount();

    return { publicadores, total };
  }

  async findByCongregacaoAndPin(congregacaoId: string, pin: string) {
    return await this.createQueryBuilder('publicador')
      .where('publicador.congregacao = :id', { id: congregacaoId })
      .andWhere('publicador.pin = :pin', { pin })
      .getOne();
  }
}
