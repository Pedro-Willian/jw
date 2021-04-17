import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicadorRepository } from './publicador.repository';

@Injectable()
export class PublicadorService {
  constructor(
    @InjectRepository(PublicadorRepository)
    private publicadorRepository: PublicadorRepository,
  ) {}

  async list() {
    const result = await this.publicadorRepository.findPublicadores();
    return result;
  }
}
