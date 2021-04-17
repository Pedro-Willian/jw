import { EntityRepository, Repository } from 'typeorm';
import { Grupo } from './grupo.entity';

@EntityRepository(Grupo)
export class GrupoRepository extends Repository<Grupo> {}
