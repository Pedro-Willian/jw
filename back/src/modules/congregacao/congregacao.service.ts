import { Injectable } from '@nestjs/common';
import { CongregacaoRepository } from './congregacao.repository';

@Injectable()
export class CongregacaoService {
  constructor(private congregacaoRepository: CongregacaoRepository) {}
}
