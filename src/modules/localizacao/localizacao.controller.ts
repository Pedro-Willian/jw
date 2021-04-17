import { Controller } from '@nestjs/common';
import { LocalizacaoService } from './localizacao.service';

@Controller('localizacao')
export class LocalizacaoController {
  constructor(private service: LocalizacaoService) {}
}
