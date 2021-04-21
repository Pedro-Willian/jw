import { Controller } from '@nestjs/common';
import { CongregacaoService } from './congregacao.service';

@Controller('congregacao')
export class CongregacaoController {
  constructor(private service: CongregacaoService) {}
}
