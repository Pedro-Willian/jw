import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CongregacaoRepository } from './congregacao.repository';

@Injectable()
export class CongregacaoService {
  constructor(
    @InjectRepository(CongregacaoRepository)
    private congregacaoRepository: CongregacaoRepository,
  ) {}

  async list() {
    const result = await this.congregacaoRepository.findCongregacoes();
    return result;
  }
}
