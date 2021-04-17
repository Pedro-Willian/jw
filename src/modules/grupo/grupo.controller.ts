import { Controller } from '@nestjs/common';
import { GrupoService } from './grupo.service';

@Controller('grupo')
export class GrupoController {
  constructor(private service: GrupoService) {}
}
