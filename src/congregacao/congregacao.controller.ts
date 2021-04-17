import { Controller, Get } from '@nestjs/common';
import { CongregacaoService } from './congregacao.service';

@Controller('congregacao')
export class CongregacaoController {
  constructor(private service: CongregacaoService) {}

  @Get()
  list() {
    return this.service.list();
  }
}
