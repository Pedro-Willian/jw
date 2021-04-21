import { Injectable } from '@nestjs/common';
import { PublicadorRepository } from './publicador.repository';

@Injectable()
export class PublicadorService {
  constructor(private publicadorRepository: PublicadorRepository) {}

  async list() {
    const result = await this.publicadorRepository.findPublicadores();
    return result;
  }
}
