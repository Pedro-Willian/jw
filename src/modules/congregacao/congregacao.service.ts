import { Injectable } from '@nestjs/common';
import { CongregacaoRepository } from './congregacao.repository';

@Injectable()
export class CongregacaoService {
  constructor(private congregacaoRepository: CongregacaoRepository) {}

  async list() {
    const result = await this.congregacaoRepository.findCongregacoes();
    return result;
  }
}
