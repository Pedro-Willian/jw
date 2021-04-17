import { EntityRepository, Repository } from 'typeorm';
import { Localizacao } from './localizacao.entity';

@EntityRepository(Localizacao)
export class LocalizacaoRepository extends Repository<Localizacao> {}
